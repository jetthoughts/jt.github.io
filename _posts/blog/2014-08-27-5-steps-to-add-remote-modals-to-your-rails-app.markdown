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

```html.erb
<%# app/views/layouts/modal.html.erb %>
<div class="modal" id="mainModal" tabindex="-1" role="dialog" aria-labelledby="mainModalLabel" aria-hidden="true">
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
```

Also, we need to define place where modals will be rendered. Let's add it to `application` layout:

```html.erb
<%# app/views/layouts/application.html.erb %>
<div id="modal-holder"></div>
```

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

####**Step 3. Create Modal Responder**

Ok, now when we have prepared our frontend, we need to implement the server side logic.

I am widely using `respond_with` in my applications, so I want something similar for modals.

The `respond_with` method is using the `ActionController::Responder` class for result rendering. Let's make our own implementation and call it `ModalResponder`.

{% highlight ruby linenos=table %}
class ModalResponder < ActionController::Responder
  cattr_accessor :modal_layout
  self.modal_layout = 'modal'

  def render(*args)
    options = args.extract_options!
    if request.xhr?
      options.merge! layout: modal_layout
    end
    controller.render *args, options
  end

  def default_render(*args)
    render(*args)
  end

  def redirect_to(options)
    if request.xhr?
      head :ok, location: controller.url_for(options)
    else
      controller.redirect_to(options)
    end
  end
end
{% endhighlight %}

Here, we are overriding `render` and `redirect_to` methods to give them the new behavior when request is made via xhr.

If request is made via ajax we want `render` to use our custom `modal` layout. And instead of redirecting we want `redirect_to` to return only headers with `location` header set which will handle our js logic.

####**Step 4. Modify Application Controller**

Now, when we have our custom `ModalResponder`, let's add our own helper `respond_modal_with`. It will call the `respond_with` method with `ModalResponder` specified as the responder:

{% highlight ruby linenos=table %}
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def respond_modal_with(*args, &blk)
    options = args.extract_options!
    options[:responder] = ModalResponder
    respond_with *args, options, &blk
  end
end
{% endhighlight %}

####**Step 5. Use it!**

Ok, now we have everything to use our cool remote modals. Let's use them!

Well, in the first place, we need to add a link to the modal:

```html.erb
<%= link_to 'Create category', new_category_path, 
            data: { modal: true } %>
```

Now, we need to modify our controller using our new `respond_modal_with` method instead of `respond_with`:

{% highlight ruby linenos=table %}
class CategoriesController < ApplicationController
  respond_to :html, :json

  def new
    @category = Category.new
    respond_modal_with @category
  end

  def create
    @category = Category.create(category_params)
    respond_modal_with @category, location: root_path
  end

  private

  def category_params
    params.require(:category).permit(:name, :order)
  end
end
{% endhighlight %}

And, finally, you should add 2 attributes to your form:

```html.erb
<%= simple_form_for(@category, remote: request.xhr?, html: { data: { modal: true } }) %>
```

`remote` is used to tell `jquery_ujs` to submit this form with ajax. I am using `request.xhr?` because I want this form be fully functional both when displayed in modal and separately.

`data-modal` is used to tell our script to handle this form as the modal form.

I've created a small demo application which you can find here:  [source code on github](http://remote-modals-demo.herokuapp.com/)


