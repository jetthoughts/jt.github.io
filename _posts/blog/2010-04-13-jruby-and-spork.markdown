---
layout: post
title: Jruby and Spork
date: 13-04-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- jruby
- spork
categories:
- blog
- tech
excerpt: A way to avoid spork/forker error.

---

When you try to run spork you have to enable fork for spork (instead you will have an error
`spork/forker.rb:18:in `initialize': fork is unsafe and disabled by default on JRuby (NotImplementedError)`). So it should look like:

{% highlight ruby linenos=table %}
jruby -J-Djruby.fork.enabled=true <path-to-jruby-binaries>/spork
{% endhighlight %}
