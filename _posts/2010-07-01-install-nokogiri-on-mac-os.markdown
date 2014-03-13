---
layout: post
title: Install Nokogiri on Mac OS
date: 01-07-2010
author: Michael Nikitochkin
authors_git: miry
tags: nokogiri,macos
category: tech
excerpt: How to install gem geoip_city.
---

Run in the terminal:

{% highlight bash linenos=table %}
sudo gem install nokogiri -- --with-xml2-include=/usr/include/libxml2 --with-xml2-lib=/usr/lib --with-xslt-dir=/usr
{% endhighlight %}
