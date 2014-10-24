---
layout: post
author: Michael Nikitochkin
authors_git: miry
title: 'Run Tests Against Multiple Ruby Versions On CircleCI'
date: 24-11-2014
tags:
- rails
- ruby

categories:
- blog
- tricks
---

<div class="left" style="margin-right: 1em;">
    <img src="https://farm4.staticflickr.com/3887/14372035815_7ded626494.jpg" title="multiple_versions"/>
</div>

Using multiple MRI ruby versions is not very hard. There are some ruby versions that have already been installed, and if you would like to add, for example, `2.2.0-dev` you need to have a closer look. [CircleCI](https://circleci.com) adds a lot of abilities to run different commands during all processes.

<!--cut-->

### 1. Run the same tests against multiple ruby versions for the same platform

{% highlight ruby linenos=table %}
dependencies:
  override:
    - 'rvm-exec 2.1.0 bundle install'
    - 'rvm-exec 2.2.0-preview1 bundle install'

test:
  override:
    - 'rvm-exec 2.1.0 bundle exec rake'
    - 'rvm-exec 2.2.0-preview1 bundle exec rake'
{% endhighlight %}

It was easy. The main feature that CircleCI uses is [rvm] and it helps us to choose the correct ruby version. There is a list of preinstalled ruby [versions](https://circleci.com/docs/environment#ruby). In the first section we install gems for each ruby and in the second we run a test.

### 2. Install custom ruby version

Before runnung tests against a new version of ruby, we should install it. [rvm] helps us to do that.

{% highlight ruby linenos=table %}
dependencies:
  pre:
    - 'rvm install ruby-head'
  
  override:
    - 'rvm-exec ruby-head bundle install'
    #....

test:
  override:
    - 'rvm-exec ruby-head bundle exec rake'
    #....
{% endhighlight %}

Now you should see the logs with ruby installation.

### 3. Jruby + MRI

We already know how to run test for multiple ruby versions. Now let's add supporting of [JRuby]. [Latest version](https://circleci.com/docs/environment#ruby) that CircleCI currently supports is `jruby-1.7.13`. Let's update our config to use the latest available by rvm.

{% highlight ruby linenos=table %}
dependencies:
  pre:
    - 'rvm install jruby'
    #....
  
  override:
    - 'rvm-exec jruby bundle install'
    #....

test:
  override:
    - 'rvm-exec jruby bundle exec rake'
    #....
{% endhighlight %}

Let's add other options to specify what JVM should use and Jruby options:

{% highlight ruby linenos=table %}
machine:
  java:
    version: 'openjdk7'
  environment:
    RAILS_ENV: 'test'
    JRUBY_OPTS: '-J-XX:+TieredCompilation -J-XX:TieredStopAtLevel=1 -J-noverify -X-C -Xcompile.invokedynamic=false --1.9 -J-Xmx1g'
{% endhighlight %}

### 4. What if Java gems are different from MRI

As you know, the real world projects are cruel, and mostly you have different versions of gems or even different gems to support Jruby and MRI. A simple solution is just to add a separate `Gemfile` for Java. And to update our config file accordingly :

{% highlight ruby linenos=table %}
dependencies:
  override:
    - 'rvm-exec jruby bundle install --gemfile Gemfile.java'
    #....

test:
  override:
    - 'BUNDLE_GEMFILE=Gemfile.java rvm-exec jruby bundle exec rake'
    #....
{% endhighlight %}

### 5. Parallelism

I was tired of waiting for all tests to be finished. And decided to split all processes. I've found a good [manual](https://circleci.com/docs/parallel-manual-setup) and what we have:

{% highlight ruby linenos=table %}
machine:
  java:
    version: openjdk7
  environment:
    RAILS_ENV: test
    JRUBY_OPTS: -J-XX:+TieredCompilation -J-XX:TieredStopAtLevel=1 -J-noverify -X-C -Xcompile.invokedynamic=false --1.9 -J-Xmx2g

dependencies:
  cache_directories:
    - '../.rvm/rubies'

  override:
    - >
      case $CIRCLE_NODE_INDEX in
       0)
         rvm-exec 2.1.0 bash -c "bundle check --path=vendor/bundle || bundle install --path=vendor/bundle"
         ;;
       1)
         rvm-exec 2.2.0-preview1 bash -c "bundle check --path=vendor/bundle || bundle install --path=vendor/bundle"
         ;;
       2)
         rvm-exec ruby-head gem install bundler
         rvm-exec ruby-head bash -c "bundle check --path=vendor/bundle || bundle install --path=vendor/bundle"
         ;;
       3)
         rvm-exec jruby gem install bundler
         rvm-exec jruby bash -c "bundle check --path=vendor/bundle --gemfile Gemfile.java || bundle install --path=vendor/bundle --gemfile Gemfile.java"
         ;;
      esac

test:
  override:
    - case $CIRCLE_NODE_INDEX in 0) rvm-exec 2.1.0 bundle exec rake ;; 1) rvm-exec 2.2.0-preview1 bundle exec rake ;; 2) rvm-exec ruby-head bundle exec rake ;; 3) BUNDLE_GEMFILE=Gemfile.java rvm-exec jruby bundle exec rake ;; esac:
        parallel: true

{% endhighlight %}

You can move these scripts to files.

That's all, folks. You can find the final version of `circle.yml` with some tricks  [here](https://github.com/miry/multiple_ruby_for_circleci/blob/master/circle.yml)

CircleCI build: https://circleci.com/gh/miry/multiple_ruby_for_circleci/36

