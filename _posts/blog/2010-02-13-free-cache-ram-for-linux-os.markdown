---
layout: post
title: Free cache RAM for Linux OS
date: 13-02-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- linux
- ram
categories:
- blog
- magic

---

For running some performance tests you might want to free cache RAM example test your web server or DB.

![Before clear](/images/ram_info_before_clear.png "Before clear")

<!--cut-->

{% highlight bash linenos=table %}
sudo echo 3 | sudo tee /proc/sys/vm/drop_caches
{% endhighlight %}

![After clear](/images/ram_after.png "After clear")

