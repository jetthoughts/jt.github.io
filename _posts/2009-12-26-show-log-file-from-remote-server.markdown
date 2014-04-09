---
layout: post
title: Show Log File from Remote Server
date: 26-12-2009
author: Michael Nikitochkin
authors_git: miry
tags: rails,capistrano,ruby
category: tech

---

Creating a simple *capistrano* task for showing current log file from remote server is so simple. Just add the following  lines to *Capfile* or *config/deploy.rb* (if you are using Rails)

{% highlight ruby linenos=table %}
desc
task :show_log do
  run "tail -f #{current_path}/log/#{rails_env}.log"
end
{% endhighlight %}

<!--cut-->

Run this task:

{% highlight bash linenos=table %}
# cap show_log
{% endhighlight %}

And you will see log file in real time.

So it is a universal method that works for multistage capistrano extension too.

{% highlight bash linenos=table %}
# cap production show_log
{% endhighlight %}
