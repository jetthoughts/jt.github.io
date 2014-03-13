---
layout: post
title: Installing Pg gem on Mac OS
date: 26-09-2010
author: Michael Nikitochkin
authors_git: miry
tags: pg,postgresql,rails
category: tech
excerpt: Installing postgres(pg) gem for i386 arch.
---

I have Mac OS Snow Leopard which has arch x86_64. But when I tried to install postgres gem for this arch, I had errors, such as:

{% highlight ruby linenos=table %}
compat.h:38:2: error: #error PostgreSQL client version too old, requires 7.3 or later.
{% endhighlight %}

So I installed postgres(pg) gem for i386 arch:

{% highlight ruby linenos=table %}
export ARCHFLAGS='-arch i386'
PATH=/Library/PostgreSQL/8.4/bin:/usr/bin:/bin /usr/bin/gem install pg -- --with-pgsql-config=/Library/PostgreSQL/8.4/bin/pg_config
{% endhighlight %}
