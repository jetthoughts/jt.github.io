---
layout: post
title: Convert BPlist to XML
date: 14-02-2010
author: Michael Nikitochkin
authors_git: miry
tags: macos,plist,xml,bplist
category: tech

---

Convert Mac OS preference files to xml:

{% highlight bash linenos=table %}
plutil -convert xml1 path/to/preferences.plist
{% endhighlight %}

<!--cut-->

Then open *path/to/preferences.plist* and see XML formated file. Make some changes and
convert back:

{% highlight bash linenos=table %}
plutil path/to/preferences.plist
{% endhighlight %}
