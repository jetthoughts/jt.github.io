---
layout: post
author: Valeriy Mironov
authors_git: valeronm
title: Recent Searches & Sorting Hashes: How They are Connected
date: 14-10-2014
tags:
- rails

categories:
- blog
- tech
---
![sorting_hashes](https://farm4.staticflickr.com/3954/14914812874_021a2414a1.jpg)

In one of the applications, that we are developing, we needed to implement the storing of 10 last user search requests. If they were simple text queries, that would be the end of the story. However, the issue turned out to be much more complicated, because we had to save search filters.

<!--cut-->

