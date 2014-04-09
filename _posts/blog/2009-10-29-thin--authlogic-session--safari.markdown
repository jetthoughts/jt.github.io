---
layout: post
title: Thin + Authlogic Session + Safari
author: Michael Nikitochkin
authors_git: miry
date: 2009-10-29
tags:
- linux
- thin
- authlogic
categories:
- blog
- tech
excerpt: Description of Rails 2.3.4 bug with Authlogic.

---

Yesterday I spent a lot of time because I did not login in Safari. Tried Firefox, worked fine. Also I don’t like the fact that Safari sends several requests to server. Maybe that happens because of resource load monitor which has been turned on. I used Thin server for a simple Rails application with authlogic. 

Today in the morning I decided to debug. Found out that while using Mongrel everything works fine. After running several tests, the same issue came up. I cannot understand, why Safary sends two requests instead of one. I use Rails 2.3.4. When it was released, I saw their bug with authlogic in the news. 

