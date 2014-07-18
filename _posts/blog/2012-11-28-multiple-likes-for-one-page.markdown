---
layout: post
author: Michael Nikitochkin
authors_git: miry
title: Multiple Likes for One Page
date: 28-11-2012
tags:
- facebook
- like
- button
- thumbnail
- image
- mutliple
- rails
- route
- meta
categories:
- blog
- tricks
excerpt: A step-by-step tutorial for adding several Facebook Like buttons for one page or product.

---

In many projects we use Facebook Like button to share the link.
Sometimes we need to provide a specific thumbnail and a page description. What if we want to share the same page for different products with different thumbnails.
In this article I will describe how to resolve this issue step by step.
A sample application is pushed to [Github](https://github.com/miry/facebook-multiple-like-sample).
And deployed to [Heroku](http://facebook-multiple-like.herokuapp.com/).

Add a Facebook Like Button
--------------------------

To add a simple button we need include the [JavaScript SDK](https://developers.facebook.com/docs/reference/javascript/)
on your page once, ideally right after the opening `<body>` tag:

{% highlight html linenos=table %}
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
{% endhighlight %}

And in a place where you want the button to appear:

{% highlight html linenos=table %}
<div class="fb-like" data-href="<replace_with_your_path>" data-send="false" data-width="450" data-show-faces="false"></div>
{% endhighlight %}

For example, if you want to share a product, you should put it like this:


{% highlight ruby linenos=table %}
<%= image_tag(@product.image_url) %>
<div class="fb-like" data-href="<%= product_url(@product) %>" data-send="false" data-width="450" data-show-faces="false"></div>
{% endhighlight %}

Don't forget to provide the full url, not only the path.
You can easily generate a custom *Like button* [here](https://developers.facebook.com/docs/reference/plugins/like).

How does the Facebook Like Button Work
--------------------------------------

After a user clicks on a like button, the url from the attribue `data-href` is sent to the Facebook service.
If the url is missed in a store of urls, Facebook runs a scrapper to get all required information about the page.
What does the scrapper look for?
Firstly, it tries to find [Open Graph Tags](https://developers.facebook.com/docs/reference/plugins/like/#ogtags) meta tags on this page.
If some of them have been missed it tries to fill it by content from the page.
Example, there are no `image`open graph tag, so the scrapper finds the first image from the document with required minimal size.

To check what values the scrapper will return for your page, you can use a [Facebook Debugger tool](https://developers.facebook.com/tools/debug).
With this tool you can check what image would be provided for users.

Customize Image and Title
-------------------------

Now we have the button and the ability to share the page. But what if we want to provide our special image, instead of Facebook's variant.
We need to add the [Open Graph tag](https://developers.facebook.com/docs/reference/plugins/like/#ogtags) for `image` and `title`. Let us add an ability to add headers from the action views to our layout.
In `app/views/application.html.erb` add this line before closing tag `</head>`:

{% highlight ruby linenos=table %}
<head>
  ...
  <%= yield :head %>
</head>
{% endhighlight %}

and this to our view `app/views/products/show.html.erb`:

{% highlight ruby linenos=table %}
<% content_for :head do %>
  <meta property="og:title" content="<%= @product.title %>"/>
  <meta property="og:image" content="<%= @product.image_url %>" />
<% end %>
{% endhighlight %}

I use [CarrierWave](https://github.com/jnicklas/carrierwave) for attachment images.
After adding these lines, I have found the following problem: `image_url` returns only url without host (if not using [Fog](https://github.com/fog/fog) and S3 storage).
This issue can be resolved by adding the `config.action_controller.asset_host = "http://facebook-multiple-like.herokuapp.com"` to the environment.
And use method `image_path` to return image with assets host. After our view would be:

{% highlight ruby linenos=table %}
<% content_for :head do %>
  <meta property="og:title" content="<%= @product.title %>"/>
  <meta property="og:image" content="<%= image_path @product.image_url %>" />
<% end %>
{% endhighlight %}

Checking our url in the [Facebook Debugger](https://developers.facebook.com/tools/debug/og/object?q=http%3A%2F%2Ffacebook-multiple-like.herokuapp.com)

Use Different Images For Each Like Button
-----------------------------------------

Let us add Like button to index page of products.
In this case if we add a simple Like button with the same path as for show product page, then we would have different images and titles.
But what if you want to share the `products#index` page instead of `products#show`.
We would encounter the following problem: we have the same url, but we want to use images from the products. `app/views/products/index.html.erb`:

{% highlight ruby linenos=table %}
 <ul>
   <% products.all.each do |product| %>
     <li>
       <%= image_tag(product.image_url) if product.image? %>
       <div class="fb-like" data-href="<%= products_url %>" data-send="false" data-width="450" data-show-faces="false"></div>
     </li>
   <% end %>
 </ul>
{% endhighlight %}

There are several methods to show different image and title for Like button feature.
These methods are based on the next rule: *Generate a uniq url for each product/image*.

The first method is to add some extra quaery string to page url for like button.
We just need to replace in generation button snippet url from `products_url` to `products_url(featured_id: product.id)` in `app/views/products/index.html.erb`:

{% highlight ruby linenos=table %}
<ul>
  <% products.all.each do |product| %>
    <li>
      <%= image_tag(product.image_url) if product.image? %>
      <div class="fb-like" data-href="<%= products_url(featured_id: product.id) %>" data-send="false" data-width="450" data-show-faces="false"></div>
    </li>
  <% end %>
</ul>
{% endhighlight %}

Then we add to our controller `app/controllers/products_controller.rb` to get the featured product by param `featured_id`:

{% highlight ruby linenos=table %}
@featured_product = Product.find(params[:featured_id]) if params[:featured_id]
{% endhighlight %}

and we update the view:

{% highlight ruby linenos=table %}
<% content_for :head do %>
  <% product = @featured_product ? @featured_product : @products.first %>
  <meta property="og:title" content="<%= product.title %>"/>
  <meta property="og:image" content="<%= image_path product.image_url %>" />
<% end %>
{% endhighlight %}

That's all. Now you can check this with debugger:

1. [debug url for product 1](https://developers.facebook.com/tools/debug/og/object?q=http%3A%2F%2Ffacebook-multiple-like.herokuapp.com%2F%3Ffeatured_id%3D1)
2. [debug url for product 2](https://developers.facebook.com/tools/debug/og/object?q=http%3A%2F%2Ffacebook-multiple-like.herokuapp.com%2F%3Ffeatured_id%3D2)


Another solution is to add a custom url to the same action with param `:featured_id`:

{% highlight ruby linenos=table %}
 match '/products/:featured_id' => 'products#index', as: :featured_product
{% endhighlight %}

Or you can use, for example, `show` action but render `index` template.

References:

1. [Facebook debugger](https://developers.facebook.com/tools/debug)
2. [Facebook developer documentation](https://developers.facebook.com/docs/reference/plugins/like/)
3. [Github sources](https://github.com/miry/facebook-multiple-like-sample)
4. [Demo](http://facebook-multiple-like.herokuapp.com/)
