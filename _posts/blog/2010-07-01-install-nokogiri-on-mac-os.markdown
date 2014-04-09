---
layout: post
title: Install Nokogiri on Mac OS
date: 01-07-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- nokogiri
- macos
categories:
- blog
- magic
excerpt: How to install gem nokogiri on Mac OS.
---

Run in the terminal:

{% highlight bash linenos=table %}
sudo gem install nokogiri -- --with-xml2-include=/usr/include/libxml2 --with-xml2-lib=/usr/lib --with-xslt-dir=/usr
{% endhighlight %}
