---
layout: post
author: Michael Nikitochkin
authors_git: miry
title: Simple Benchmarking Rack Web Server
date: 12-08-2014
tags:
- ruby
- benchmarking
- server

categories:
- blog
- tech

---

Before each project we check new versions of favorite Ruby web servers and choose which is the best.

Let's use, for example, [Geminabox](http://tomlea.co.uk/posts/gem-in-a-box/) application to distribute gems in the local network for our company. [Geminabox](http://tomlea.co.uk/posts/gem-in-a-box/) is a very tiny Rack application and it is easy to configure. You can get the sample [here](https://github.com/miry/geminabox_web_server). 

![Geminabox](http://ournewupdates.files.wordpress.com/2011/11/gem-box.png)

There are a lot of Ruby Web Servers. More details you can get from Digital Ocean article [A Comparison of (Rack) Web Servers for Ruby Web Applications](https://www.digitalocean.com/community/tutorials/a-comparison-of-rack-web-servers-for-ruby-web-applications). I excluded **Passenger** because it requires to compile Nginx module and **Thin** - it could not use all CPU cores.

<!--cut-->

## Test environment:

- Hardware: MacMini Late 2012 (16 GB 1333 MHz DDR3, 2.5 GHz Intel Core i5)
- OS: OS X 10.9.4 (13E28)
- Ruby versions: ruby-2.2.0-dev, jruby-1.7.9
- Benchmark tool: [Siege](http://linux.die.net/man/1/siege)
- Web servers: [Puma](http://puma.io), [Unicorn](http://unicorn.bogomips.org), [TorqueBox](http://torquebox.org)

# Benchmarking

Before we go we should install all ruby versions and required gems. I use [rbenv](http://rbenv.org) to manage multiple ruby versions in one host.

{% highlight bash linenos=table %}
$ rbenv install 2.2.0-dev
$ rbenv shell 2.2.0-dev
$ gem install bundler puma unicorn 
$ rbenv install jruby-1.7.9
$ rbenv shell jruby-1.7.9
$ gem install bundler puma torquebox
{% endhighlight %}


Prepare the application:

{% highlight bash linenos=table %}
$ git clone http://github.com/miry/geminabox_web_server
$ cd geminabox_web_server
{% endhighlight %}

## Unicorn + Ruby

Run Rack application:

{% highlight bash linenos=table %}
$ rbenv shell 2.2.0-dev
$ sudo WEB_CONCURRENCY=5 unicorn -c config/unicorn.rb
{% endhighlight %}

 *Siege report for 5 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		          50 hits
Availability:		      100.00 %
Elapsed time:		       15.83 secs
Data transferred:	       30.93 MB
Response time:		        0.86 secs
Transaction rate:	        3.16 trans/sec
Throughput:		        1.95 MB/sec
Concurrency:		        2.72
Successful transactions:          50
Failed transactions:	           0
Longest transaction:	        1.20
Shortest transaction:	        0.58
{% endhighlight %}

*Siege report for 25 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		         250 hits
Availability:		      100.00 %
Elapsed time:		       63.15 secs
Data transferred:	      154.66 MB
Response time:		        5.49 secs
Transaction rate:	        3.96 trans/sec
Throughput:		        2.45 MB/sec
Concurrency:		       21.73
Successful transactions:         250
Failed transactions:	           0
Longest transaction:	        6.58
Shortest transaction:	        1.36
{% endhighlight %}

## Puma + Ruby
### With 5 workers

Run Rack application:

{% highlight bash linenos=table %}
$ rbenv shell 2.2.0-dev
$ sudo puma config.ru -t 4:32 -p 80 -w 5
{% endhighlight %}

CPU was loaded at near 360%.

*Siege report for 5 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		          50 hits
Availability:		      100.00 %
Elapsed time:		       15.30 secs
Data transferred:	       30.93 MB
Response time:		        0.81 secs
Transaction rate:	        3.27 trans/sec
Throughput:		        2.02 MB/sec
Concurrency:		        2.65
Successful transactions:          50
Failed transactions:	           0
Longest transaction:	        1.64
Shortest transaction:	        0.46
{% endhighlight %}


*Siege report for 25 concurrencies:*


{% highlight bash linenos=table %}
Transactions:		         250 hits
Availability:		      100.00 %
Elapsed time:		       61.02 secs
Data transferred:	      154.66 MB
Response time:		        4.78 secs
Transaction rate:	        4.10 trans/sec
Throughput:		        2.53 MB/sec
Concurrency:		       19.59
Successful transactions:         250
Failed transactions:	           0
Longest transaction:	       16.57
Shortest transaction:	        0.52
{% endhighlight %}

## Puma + Ruby
### Without workers

Run Rack application:

{% highlight bash linenos=table %}
$ rbenv shell 2.2.0-dev
$ sudo bundle exec puma config.ru -t 4:32 -p 80
{% endhighlight %}

CPU was loaded at 100% only

*Siege report for 5 concurrencies:*


{% highlight bash linenos=table %}
Transactions:		          50 hits
Availability:		      100.00 %
Elapsed time:		       21.18 secs
Data transferred:	       30.93 MB
Response time:		        1.41 secs
Transaction rate:	        2.36 trans/sec
Throughput:		        1.46 MB/sec
Concurrency:		        3.34
Successful transactions:          50
Failed transactions:	           0
Longest transaction:	        2.37
Shortest transaction:	        0.38
{% endhighlight %}


*Siege report for 25 concurrencies:*


{% highlight bash linenos=table %}
Transactions:		         250 hits
Availability:		      100.00 %
Elapsed time:		      111.67 secs
Data transferred:	      154.66 MB
Response time:		       10.55 secs
Transaction rate:	        2.24 trans/sec
Throughput:		        1.38 MB/sec
Concurrency:		       23.62
Successful transactions:         250
Failed transactions:	           0
Longest transaction:	       11.19
Shortest transaction:	        7.34
{% endhighlight %}

## Puma + JRuby

Run Rack application:

{% highlight bash linenos=table %}
$ rbenv shell jruby-1.7.9
$ sudo bundle exec puma config.ru -t 4:32 -p 80
{% endhighlight %}

For first requests a response time was huge. But after the second experiment, it was decreased. During the experiments the CPU was loaded at near 350%.


*Siege report for 5 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		          50 hits
Availability:		      100.00 %
Elapsed time:		       10.61 secs
Data transferred:	       30.93 MB
Response time:		        0.44 secs
Transaction rate:	        4.71 trans/sec
Throughput:		        2.92 MB/sec
Concurrency:		        2.09
Successful transactions:          50
Failed transactions:	           0
Longest transaction:	        0.66
Shortest transaction:	        0.25
{% endhighlight %}


*Siege report for 25 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		         250 hits
Availability:		      100.00 %
Elapsed time:		       41.97 secs
Data transferred:	      154.66 MB
Response time:		        3.46 secs
Transaction rate:	        5.96 trans/sec
Throughput:		        3.68 MB/sec
Concurrency:		       20.61
Successful transactions:         250
Failed transactions:	           0
Longest transaction:	        5.83
Shortest transaction:	        0.35
{% endhighlight %}

## TorqueBox + JRuby

Run Rack application:

{% highlight bash linenos=table %}
$ rbenv shell jruby-1.7.9
$ torquebox deploy
$ torquebox run
{% endhighlight %}

*Siege report for 5 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		          50 hits
Availability:		      100.00 %
Elapsed time:		       15.18 secs
Data transferred:	       30.93 MB
Response time:		        0.72 secs
Transaction rate:	        3.29 trans/sec
Throughput:		        2.04 MB/sec
Concurrency:		        2.37
Successful transactions:          50
Failed transactions:	           0
Longest transaction:	        1.07
Shortest transaction:	        0.39
{% endhighlight %}

*Siege report for 25 concurrencies:*

{% highlight bash linenos=table %}
Transactions:		         250 hits
Availability:		      100.00 %
Elapsed time:		       63.80 secs
Data transferred:	      154.66 MB
Response time:		        5.76 secs
Transaction rate:	        3.92 trans/sec
Throughput:		        2.42 MB/sec
Concurrency:		       22.59
Successful transactions:         250
Failed transactions:	           0
Longest transaction:	        7.48
Shortest transaction:	        2.52
{% endhighlight %}

# Conclusion

After current investigation, I see that [Puma](http://puma.io) is cross platform and fast web server. So if you have not decided what ruby to choose, [Puma](http://puma.io) will be the best solution.
More about benchmarking and web servers:

- [The Ruby Web Benchmark Report](http://www.madebymarket.com/blog/dev/ruby-web-benchmark-report.html)
- [A Simple Webserver Comparison](https://gist.github.com/cespare/3793565)
- [Benchmarking TorqueBox](http://torquebox.org/news/2011/02/23/benchmarking-torquebox/)
- [High Performance Ruby Part 3: non-blocking IO and web application scalability](http://blog.gregweber.info/posts/2011-06-16-high-performance-rb-part3)



