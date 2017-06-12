---
layout: post
date: 26-09-2013
title: "Capistrano 3: Passing Parameters to Your Task"
author: Michael Nikitochkin
authors_git: miry
tags: ruby capistrano deploy config rakefile
categories:
- blog
- magic

redirect_to:
- https://jtway.co/capistrano-3-passing-parameters-to-your-task-e22cc9f659c3
---

The new way of passing parameters in Capistrano v3 is to use the same solution as Rake (in some sort Capistrano 3 is  totally based on Rake).

A little example, let us create a task to run any specific rake task with options:

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
<!--cut-->

and now we can run `rake db:migrate` on remote hosts:

{% highlight bash linenos=table %}
$ cap staging "task:invoke[db:migrate]"
INFO [397d776e] Running rake db:migrate on 8.8.8.8
DEBUG [397d776e] Command: ( RAILS_ENV=staging rake db:migrate )
...
{% endhighlight %}

I used the quotes, because for `zsh` the brackets are used for some shell features.

Some more information with good examples of passing parameters to rake task can be found [here](http://viget.com/extend/protip-passing-parameters-to-your-rake-tasks)
