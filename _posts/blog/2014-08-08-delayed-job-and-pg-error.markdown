---
layout: post
author: Dmitriy Dudkin
authors_git: tmwh
title: DelayedJob and PG::error: No Connection to Server
date: 08-08-2014
tags:
- ruby
- delayedjob

categories:
- blog
- tech
---

Recently I've got strange errors on the staging server. Delayed::Job workers started successfully. But when they were starting to lock the jobs, workers failed with PG::Error: no connection to server and  PG::Error: FATAL: invalid frontend message type 60 errors. 

<!--cut-->

Obviously, that is not what I've expected from [Delayed::Job] workers. So I took the shovel and started digging into git history. Since the last release the only significant modification has been made in the internationalization. We've moved to [I18n-active_record] backend to grant the privilege to modify translations not only to developers but also to highly-educated mere mortals.

So, the problem source was found, and [I18n-active_record] backend was temporary disabled.

After a while I've finally had some time to get around to  this issue again. I've enabled locales database backend and started some serious debugging.

The first thing I've found was that the problem did not turn up when delayed job workers were started using `rake jobs:work` task. So this was the first solution.

After some research on DelayedJob internals I've found that the main difference between a rake task and a binstub was in the `fork` method that was invoked in the binstub version. It is seamlessly executed using `Daemons#run_process` method.

### [Delayed::Job] lifecycle

Now let's take a break and look into DelayedJob internals. [Delayed::Job] has systems of the hooks that could be used by plugin-writers and in our applications. All this cool events functionality is hidden in `Delayed::Lifecycle` class. Each worker has its own instance of that class.

So, what events do we have there?

Job-related events:

```ruby
:enqueue
:perform
:error
:failure
:invoke_job
```

Worker-related events:

```ruby
:execute
:loop
:perform
:error
:failure
```

You can setup callbacks to be run on `before`, `after` or `around` events simply using `Delayed::Worker.lifecycle.before`, `Delayed::Worker.lifecycle.after` and `Delayed::Worker.lifecycle.around` methods.

###The Solution

Ok, let's move on to our problem. It has turned out that [delayed_job_active_record] is closing all database connections in `before_fork` hook and reestablishing them in `after_fork` hook. It was clear that I18n-active-record does not like it and does not want to play by the rules set by others. So, it needed special treatment and I provided it.

I've looked into DelayedJob lifecycle and chosen `before :execute` hook. It is being executed after all DelayedJob ActiveRecord backend connections manipulations.

So, basically my locales initializer for delayed_job workers looks like this:

```ruby
require 'i18n/backend/active_record'
  
Translation  = I18n::Backend::ActiveRecord::Translation

Delayed::Worker.lifecycle.before :execute do
  if Translation.table_exists?
    I18n.backend = I18n::Backend::ActiveRecord.new

    I18n.backend = I18n::Backend::Chain.new(I18n::Backend::Simple.new, I18n.backend)
  end
end
```

[Delayed::Job]:https://github.com/collectiveidea/delayed_job
[I18n-active_record]:https://github.com/svenfuchs/i18n-active_record
[delayed_job_active_record]:https://github.com/collectiveidea/delayed_job_active_record
