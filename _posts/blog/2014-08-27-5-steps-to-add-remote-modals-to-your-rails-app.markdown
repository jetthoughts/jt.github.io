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

####**Step 1. Modify your layout files**

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
    
Also, we need to define place where modals will be rendered. Let's add it to `application` layout:

    <%# app/views/layouts/application.html.erb %>
    <div id="modal-holder"></div>
    
####**Step 2. Create modal.js.coffee**

Now, we can move to the javascript part of our modals implementation. We want our links with `data-modal` attribute to be rendered in modal windows.

Also, we need to work on the remote forms submit. The application should properly handle redirects to the given page and form redisplays with errors. Let's assume that if the response has `Location` header set, then we need to redirect user to the given location, otherwise we will redisplay the form.

```coffescript
# app/assets/javascripts/modals.js.coffee
$ ->
  modal_holder_selector = '#modal-holder'
  modal_selector = '.modal'

  $(document).on 'click', 'a[data-modal]', ->
    location = $(this).attr('href')
    #Load modal dialog from server
    $.get location, (data)->
      $(modal_holder_selector).html(data).
      find(modal_selector).modal()
    false

  $(document).on 'ajax:success',
    'form[data-modal]', (event, data, status, xhr)->
      url = xhr.getResponseHeader('Location')
      if url
        # Redirect to url
        window.location = url
      else
        # Remove old modal backdrop
        $('.modal-backdrop').remove()

        # Replace old modal with new one
        $(modal_holder_selector).html(data).
        find(modal_selector).modal()

      false
```

