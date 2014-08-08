---
layout: post
author: Dmitriy Dudkin
authors_git: tmwh
title: Stress Testing Your Rails Application Using JMeter
date: 05-08-2014
tags:
- ruby
- jmeter
- testing

categories:
- blog
- tricks
---

Some time ago we needed to make a simple stress-testing of our application to get an idea of where we are going, and find out whether we should take a break and pay some attention to optimizations or not. The number of stress-testing tools is huge, but we decided to stick to a well-tried solution - [JMeter]. 

![stress_testing](https://farm3.staticflickr.com/2917/14648111570_9bbdb083cc.jpg)


<!--cut-->

[JMeter] is an opensource cross-platform load testing tool which is being developed by [Apache Foundation]. It has a rich graphical interface and a big number of features. But it is not novice-friendly at all. So, I think I should share my experience of playing with this tool.

## The [ruby-jmeter]

To begin with, I don't like GUIs. I'd like to write the test plan in a text format instead of building it with a mouse. [JMeter] gives us such an opportunity due to its test plans are xml files. But xml is not cool for handwriting either.

After spending 3 minutes searching with Google I've found the satisfying solution.

[ruby-jmeter] is a gem that simplifies the generation of [JMeter] test plans and allows to use Ruby language to describe them. It can generate a jmx file or start headless [JMeter] and run the test.

## Writing a test plan

Let's say that our application is a simple social network. We don't have any functionality for anonymous users except for the login page. So, the [JMeter access log sampler] is not a solution in our case and we should dig deeper.

As the starting point we should define our user steps that we want to be tested by our test plan.

I suggest 3 simple steps:

 1. [User logs into our application.](#1.-authentication)
 1. [User loads his 'friends' page.](#2.-viewing-the-pages)
 1. [User views the conversation with the random friend of his friendlist.](#3.-metrics)

We can take this method as the template:

{% highlight ruby linenos=table %}
def jmeter_test_plan(url, threads_count)
  uri = URI(url)
  test do
    threads count: threads_count do
      defaults domain: uri.host, port: uri.port
      cookies policy: 'rfc2109', clear_each_iteration: true
    end
  end
end
{% endhighlight %}

The method has 2 parameters:
 - `url` - url to our application.
 - `threads_count` - number of threads (users) that will test our app.


The `test` directive is a root point, where all the magic starts. Then, using `threads` method we are telling [JMeter] what number of users we want to use. The `defaults` command allows us to specify default options for all our http requests. And, finally,`cookies` indicates that we need to store cookies and send them with each request.


### 1. Authentication

To authenticate user in our application we need to send the POST request to `/users/sign_in` path given user[email] and user[password] parameters. Sounds simple, but there is one snag. It is the [CSRF] protection which is enabled in Rails by default. To bypass it, we need to send the csrf-token with our form.

So, to authenticate user we need to:
 1. Load the login page.
 1. Extract the `CSRF-token` from the page.
 1. `POST` the email, password and an authentication token to `/users/sign_in` path.

Let's write that in Ruby:

{% highlight ruby linenos=table %}
user_defined_variables [{name: 'email', value: email}, {name: 'password', value: password}]

visit name: 'login page', url: '/users/sign_in' do
  extract name: 'csrf-token', xpath: "//meta[@name='csrf-token']/@content", tolerant: true
  extract name: 'csrf-param', xpath: "//meta[@name='csrf-param']/@content", tolerant: true
end

http_header_manager name: 'X-CSRF-Token', value: '${csrf-token}'

submit name: '/users/sign_in', url: '/users/sign_in',
       fill_in: {
         '${csrf-param}' => '${csrf-token}',
         'user[email]' => '${email}',
         'user[password]' => '${password}',
       }
{% endhighlight %}

Firstly, we store `email` and `password` in the user defined variables. Then, we use `visit` to load our login page. The `extract` command is used to set 2 variables: the `${csrf-token}` and the `${csrf-param}` with extracted values by XPath. We use csrf-token data in `http_header_manager` method to set the header `X-CSRF-TOKEN` in order to fix `devise` issue similar to https://github.com/plataformatec/devise/issues/2734#issuecomment-41969856. And, finally, the `submit` sends the `POST` request to our app server.

To extract the `csrf-param` and `csrf-token` we are using XPath extractor which I like more than Regex extractor. Because, you know, [you can't parse HTML with regex].

### 2. Viewing the pages

Following our plan, next we need to:
 1. View the friends page.
 2. Find the url of conversation with a random friend.
 3. View the conversation with a random friend.

Ok, that's as simple as:

{% highlight ruby linenos=table %}
visit name: 'friends page', url: '/friends' do
  extract name: 'conversation-url', xpath: "//section[@class='friends']//a[@class='conversation']/@href", 
          tolerant: true
end

visit name: 'random conversation', 
      url: '${__V(conversation-url_${__Random(1,${conversation-url_matchNr})})}'
{% endhighlight %}

Well, ok, maybe not very simple. Ok, the first part is easy to understand. There is nothing new here. We are visiting the '/friends' page and extracting the `conversation-url` variable.

But under the hood the XPath Extractor creates a set of variables for each match. So, for example, when we have 5 friends on the '/friends' page, the XPath extractor will create 6 variables:

{% highlight ruby linenos=table %}
conversation-url
conversation-url_1
conversation-url_2
conversation-url_3
conversation-url_4
conversation-url_matchNr
{% endhighlight %}

The last one contains the number of matches (5 in our case). 

Ok, the next thing is this:

`'${__V(conversation-url_${__Random(1,${conversation-url_matchNr})})}'`

The `${__Random(1,${conversation-url_matchNr})}` here generates the random number between 1 and the number of matches. And the `__V()` function gets the variable content by its name.

### 3. Metrics

To display testing results we can use so-called listeners. Personally I am adding these ones:

{% highlight ruby linenos=table %}
view_results_in_table
graph_results
aggregate_graph
{% endhighlight %}

To debug your test plan you can use:

{% highlight ruby linenos=table %}
debug_sampler
view_results_tree
{% endhighlight %}

## What to read more?

This article covers only the basic usage of these great tools.

 - You can read more about JMeter in the User manual - http://jmeter.apache.org/usermanual/index.html
 - To read about ruby-jmeter DSL you can refer to the github page - https://github.com/flood-io/ruby-jmeter
 - If you want to know more about stress-testing of web applications you can read this article - http://msdn.microsoft.com/en-us/library/bb924374.aspx


[JMeter]:https://jmeter.apache.org/
[Apache Foundation]:http://www.apache.org/
[ruby-jmeter]:https://github.com/flood-io/ruby-jmeter
[JMeter access log sampler]:https://jmeter.apache.org/usermanual/jmeter_accesslog_sampler_step_by_step.pdf
[CSRF]:http://en.wikipedia.org/wiki/Cross-site_request_forgery
[you can't parse HTML with regex]:http://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags/1732454#1732454

Image courtesy of Stuart Miles / FreeDigitalPhotos.net


