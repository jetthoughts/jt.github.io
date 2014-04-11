---
layout: post
title: Rails Assets Host with SSL
date: 19-02-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- rails
- assets
categories:
- blog
- tricks

---

When we use simple assets server, such as

{% highlight ruby linenos=table %}
ActionController::Base.asset_host = "http://assets%d.example.com"
{% endhighlight %}

we have a problem with pages which use ssl and some browsers alert users that some content is not safe.

<!--cut-->

So I found in **google** the following solution:

{% highlight ruby linenos=table %}
ActionController::Base.asset_host = Proc.new { |source, request|
"#{request.protocol}assets%d.example.com" % (source.hash % 4)
}
{% endhighlight %}


It is beautiful, because for each image we use only one host, so when you refresh a page, an image always has an example host 'assets1' in each page, not some random host.
