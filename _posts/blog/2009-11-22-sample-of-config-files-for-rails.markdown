---
layout: post
title: Sample of Config Files for Rails
author: Michael Nikitochkin
authors_git: miry
date: 2009-11-22
tags:
- rails
- config
- jruby
categories:
- blog
- magic

---

Sometimes we run the same application in different platforms: Ruby and JRuby or Windows and Linux. And each platform has its own version of a gem.
Here is an example of my config file for Rails to run instance with **ruby** or **jruby**.
Setting gems for different platforms **config/environment.rb**:

{% highlight ruby linenos=table %}
if PLATFORM == 'java'
    config.gem 'rmagick4j', :lib =&gt; 'RMagick'
else
    config.gem "sqlite3-ruby", :lib =&gt; "sqlite3"
    config.gem 'rmagick', :lib =&gt; 'RMagick'
{% endhighlight %}

<!--cut-->

**config/database.yml**:

{% highlight yaml linenos=table %}
common: &default_settings
  host: localhost
  #adapter: <%= PLATFORM == 'java' ? 'jdbcpostgresql' : 'postgresql' %>
  adapter: <%= PLATFORM == 'java' ? 'jdbcmysql' : "mysql" %>
  username: root
  password:
development:
  <<: *default_settings
  database: YOUR_DATABASENAME
production:
  <<: *default_settings
  database: YOUR_DATABASENAME_PROD
test:
  <<: *default_settings
  database: YOUR_DATABASENAME_TEST
{% endhighlight %}
