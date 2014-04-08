---
layout: post
title: Allow Multiple Access Control Requests for Rails
author: Michael Nikitochkin
authors_git: miry
date: 22-12-2010
category: magic

---

If you have problem with sending XHR requests from different domains, it will be problematic to get content, because

{% highlight bash linenos=table %}
XMLHttpRequest cannot load http://different.domain.local:3000/visits. Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin.
{% endhighlight %}

The solution is to setup response headers: _Access-Control-Request-Method_, _Access-Control-Allow-Origin_.

{% highlight ruby linenos=table %}
headers['Access-Control-Allow-Origin'] = '*'
headers['Access-Control-Request-Method'] = '*'
{% endhighlight %}

<!--cut-->

Example for rails:

{% highlight ruby linenos=table %}
#app/application_controller.rb
after_filter :set_access_control_headers
def set_access_control_headers
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Request-Method'] = '*'
end
{% endhighlight %}


You can look into sources of the sample Sinatra application in [GitHub](https://github.com/miry/cross-domain-sharing).
Demo live in
[Heroku](http://cross-domain-ajax-request.herokuapp.com/index.html).
Or use [these smaples](https://gist.github.com/miry/5447203).
