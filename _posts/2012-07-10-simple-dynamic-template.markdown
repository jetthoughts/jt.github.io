---
layout: post
date: 10-07-2012
title: Simple Dynamic Template
author: Michael Nikitochkin
authors_git: miry
tags: ruby,strings,metaprogramming
category: Tech

---

Sometimes we need to define a dynamic template before defining variables used in the template.
Let me show a few examples how to solve this problem in Ruby.

The best way is to use the [format string features from the Ruby](http://ruby-doc.org/core-2.0.0/String.html#method-i-25):

{% highlight ruby linenos=table %}
string = "echo %{expr}" # -> "echo %{expr}"
string % {expr: 1}      # -> "echo 1"
{% endhighlight %}

<!--cut-->

The first method is based on the ability to evaluate the Ruby expression in string:

{% highlight ruby linenos=table %}
string = 'echo #{expr}'  # -> "echo \#{expr}"
expr = 1                 # -> 1
eval("\"#{string}\"")    # -> "echo 1"
{% endhighlight %}
