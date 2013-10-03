---
layout: post
date: 26-09-2013
title: "Capistrano 3: Passing parameters to your task"
author: Michael Nikitochkin
tags: ruby capistrano deploy config rakefile
category: Tech
---

The new way of passing parameters in Capistrano v3 is use same solution as Rake (in some order capistrano 3 totally based on Rake).

A little example, lets create a task to run any specific rake task with options:

{% highlight ruby linenos=table %}
namespace :task do
  desc 'Execute the specific rake task'
  task :invoke, :command do |task, args|
    on roles(:app) do
      execute :rake, args[:command]
    end
  end
end
{% endhighlight %}

and now we can run `rake db:migrate` on remote hosts:

{% highlight bash linenos=table %}
$ cap staging "task:invoke[db:migrate]"
INFO [397d776e] Running rake db:migrate on 8.8.8.8
DEBUG [397d776e] Command: ( RAILS_ENV=staging rake db:migrate )
...
{% endhighlight %}

I used the quotes, because for `zsh` the brackets are used for some shell features.

Some more information with good examples of passing parameters to rake task [here](http://viget.com/extend/protip-passing-parameters-to-your-rake-tasks)
