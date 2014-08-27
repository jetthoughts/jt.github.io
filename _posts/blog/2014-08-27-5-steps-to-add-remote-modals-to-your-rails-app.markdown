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

####**Step 1. Modify your layout files.**

We want to render our modals the same way we are rendering our regular pages but render them with the `modal` layout:

        <%# app/views/layouts/modal.html.erb %>
        <div class="modal" id="mainModal" tabindex="-1" role="dialog" aria-labelledby="mainModalLabel"       aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="mainModalLabel">
          <%= yield :title if content_for? :title %>&nbsp;
        </h4>
      </div>
     <%= yield %>
    </div>
    </div>
    </div>

