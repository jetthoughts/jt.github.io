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

Let's use, for example, [Geminbox] application to distribute gems in the local network for our company. [Geminbox] is a very tiny Rack application and it is easy to configure. You can get the sample [here](https://github.com/miry/geminabox_web_server). 

![GemBox](http://ournewupdates.files.wordpress.com/2011/11/gem-box.png)

There are a lot of Ruby Web Servers. More details you can get from Digital Ocean article [A Comparison of (Rack) Web Servers for Ruby Web Applications]. I excluded **Passenger** because it requires to compile Nginx module and **Thin** - it could not use all CPU cores.

<!--cut-->

## Test environment:

- Hardware: MacMini Late 2012 (16 GB 1333 MHz DDR3, 2.5 GHz Intel Core i5)
- OS: OS X 10.9.4 (13E28)
- Ruby versions: ruby-2.2.0-dev, jruby-1.7.9
- Benchmark tool: [Siege]
- Web servers: [Puma], [Unicorn], [TorqueBox]

