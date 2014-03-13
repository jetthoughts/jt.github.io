---
layout: post
title: GOD redefine 1.day
date: 01-07-2010
author: Michael Nikitochkin
authors_git: miry
tags: god,rails
category: tech
excerpt: A solution for a bug with adding gem bundler to the rails application. 
---

We add gem bundler to our rails application. So we add all gems from production server to bundle and restart an app. After that we find a strange thing: *1.day* returns 86400. but before it returns *1.day* and if we do "Time.now.to_date + 1.day" we get a 86400 day from now.

So we have researched our bundler gem list, and removed not used gems for rails.
