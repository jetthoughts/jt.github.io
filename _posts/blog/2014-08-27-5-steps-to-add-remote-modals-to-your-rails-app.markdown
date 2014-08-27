---
layout: post
author: Dmitriy Dudkin
authors_git: tmwh
title: 5 Steps to Add Remote Modals to Your Rails App
date: 27-08-2014
tags:
- rails
- remote modals

categories:
- blog
- tech
---

Sometimes you don't want to write big javascript application just to have working remote modals in your rails application. The whole JSON-response parsing thing looks big and scary. Why can't we simply render our views on server and just display them as modals to users? Let's take a look at how we can implement this with elegance.

<!--cut-->

*Note: I am using [bootstrap](http://getbootstrap.com/javascript/#modals) modals here but this solution can be adopted to any js modals implementations.*

You can find the working demo here [source code on github](http://remote-modals-demo.herokuapp.com/)
