---
layout: post
title: Rails assets host with ssl
date: 19-02-2010
author: Michael Nikitochkin
authors_git: miry
tags: rails,assets
category: tech
---

When we use simple assets server as 

{% highlight ruby linenos=table %}
ActionController::Base.asset_host = "http://assets%d.example.com"
{% endhighlight %}

, so we have a problem with pages which used ssl and some browsers alert users,that some content is not safe.

So I found in the **google** next solution:

{% highlight ruby linenos=table %}
ActionController::Base.asset_host = Proc.new { |source, request|
"#{request.protocol}assets%d.example.com" % (source.hash % 4)
}
{% endhighlight %}


It is beautiful, because for each image we use only one host, so when you refresh you page, a image always have example host 'assets1' in each page, not random host.
