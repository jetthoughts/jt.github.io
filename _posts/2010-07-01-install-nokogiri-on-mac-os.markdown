---
layout: post
title: Install Nokogiri on Mac OS
date: 01-07-2010
author: Michael Nikitochkin
tags: nokogiri,macos
category: tech
---

Run in the terminal:

```
sudo gem install nokogiri -- --with-xml2-include=/usr/include/libxml2 --with-xml2-lib=/usr/lib --with-xslt-dir=/usr
```
