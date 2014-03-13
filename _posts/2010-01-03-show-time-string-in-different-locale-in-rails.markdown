---
layout: post
title: Show Time String in Different Locale in Rails
author: Michael Nikitochkin
authors_git: miry
date: 2010-01-03
tags: ruby,i18n,rails
category: tech
excerpt: A way to show time string in different locale. 
---
I am Russian and I use native locale settings, but sometimes, I need parse date. In Rails 2.3 method date to string returns in native locale. So when I tried to parse date in JS example, I get an a error. I have read about I18n and found an answer.

{% highlight ruby linenos=table %}
I18n.l(Time.now, :locale => 'en')
{% endhighlight %}

It is returns datetime in rfc832 format, which is used in JS too.
