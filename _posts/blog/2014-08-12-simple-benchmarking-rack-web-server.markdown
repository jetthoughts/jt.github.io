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

![GemBox](http://ournewupdates.files.wordpress.com/2011/11/gem-box.png)

<!--cut-->

There are a lot of Ruby Web Servers. More details you can get from Digital Ocean article [A Comparison of (Rack) Web Servers for Ruby Web Applications](https://www.digitalocean.com/community/tutorials/a-comparison-of-rack-web-servers-for-ruby-web-applications). I excluded **Passenger** because it requires to compile Nginx module and **Thin** - it could not use all CPU cores.

## Test environment:

- Hardware: MacMini Late 2012 (16 GB 1333 MHz DDR3, 2.5 GHz Intel Core i5)
- OS: OS X 10.9.4 (13E28)
- Ruby versions: ruby-2.2.0-dev, jruby-1.7.9
- Benchmark tool: [Siege]
- Web servers: [Puma](http://puma.io), [Unicorn](http://unicorn.bogomips.org), [TorqueBox](http://torquebox.org)

# Benchmarking

Before we go we should install all ruby versions and required gems. I use [rbenv](http://rbenv.org) to manage multiple ruby versions in one host.

```shell
$ rbenv install 2.2.0-dev
$ rbenv shell 2.2.0-dev
$ gem install bundler puma unicorn 
$ rbenv install jruby-1.7.9
$ rbenv shell jruby-1.7.9
$ gem install bundler puma torquebox
```

Prepare the application:

```shell
$ git clone http://github.com/miry/geminabox_web_server
$ cd geminabox_web_server
```

## Unicorn + Ruby

Run Rack application:
```bash
$ rbenv shell 2.2.0-dev
$ sudo WEB_CONCURRENCY=5 unicorn -c config/unicorn.rb
```

Siege report for 5 concurrencies:

```text
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
```



