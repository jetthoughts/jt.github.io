---
layout: post
title: Redis Store to Store Session
date: 28-09-2010
author: Michael Nikitochkin
authors_git: miry
tags: redis,rails
category: tech

---

I use Redis to store session and cache. And when I try to cache some session values, I get an exception "TypeError (can't dump TCPSocket)". I have researched this problem. It happened because session.slice('keys') returns not simple Hash instance, but SessionHash. So instance method *to_hash* fixes all troubles.
Example:

{% highlight ruby linenos=table %}
Rails.cache.write("key", session.except("flash", :session_id, :_csrf_token))
{% endhighlight %}

<!--cut-->

Solution:

{% highlight ruby linenos=table %}
Rails.cache.write("key", session.except("flash", :session_id, :_csrf_token).to_hash)
{% endhighlight %}
