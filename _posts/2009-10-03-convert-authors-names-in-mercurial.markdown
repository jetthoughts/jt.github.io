---
layout: post
title: Convert Authors Names in Mercurial
author: Michael Nikitochkin
authors_git: miry
date: 2009-10-3
tags: mercurial,hg
category: tricks
excerpt: A solution for changing name and email in Mercurial repository.
---

#### Problem:
Change name and email in mercurial repository.
    
#### Solution: 
Use the extension [ConvertExtension](http://mercurial.selenic.com/wiki/ConvertExtension). Install this extension and configure your `.hgrc` to enable the extension by adding following lines:

{% highlight ruby linenos=table %}
  [extensions]
  hgext.convert=
{% endhighlight %}

We create a file __authors__:

{% highlight ruby linenos=table %}
  old_email@example.com=New Name <new_email@gmail.com>
{% endhighlight %}

Then run command to convert old project with old names and emails to new repo with new names:

{% highlight ruby linenos=table %}
  hg convert project project_new -A authors
{% endhighlight %}
