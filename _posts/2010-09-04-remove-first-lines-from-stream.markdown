---
layout: post
title: Remove the First Lines from Stream
author: Michael Nikitochkin
authors_git: miry
date: 04-09-2010
tags: linux,sed
category: tricks
excerpt: A clean and simple way to strip first lines from output stream. 
---

I am not a linux hacker, so I wasted a lot of time trying to find a solution to strip first lines from output stream. The first my solution was the following:

{% highlight bash linenos=table %}
tail -f some_file | ruby -e 'a =0; while t=gets; a+=1; puts t if a > 1; end'
{% endhighlight %}

It looks very long, and I thought that this problem is very popular, and at least one tool already exists in the world.

I knew a tool __sed__ and have used it before. So I have read the manual and wuala:

{% highlight bash linenos=table %}
tail -f some_file | sed "1d"
{% endhighlight %}

Remove the first 10 lines:

{% highlight bash linenos=table %}
tail -f some_file | sed '1,10d'
{% endhighlight %}

It does the same thing as the first solution, but it is more clear and simple. __sed__ is a great tool.
