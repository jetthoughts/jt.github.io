---
layout: post
author: Dmitriy Dudkin
authors_git: tmwh
title: Cleaning Up Your Rails Views With View Objects
date: 14-08-2014
tags:
- rails
- view objects

categories:
- blog
- tech
---

### Why logic in views is a bad idea?

<div class="left" style="margin-right: 1em;">
    <img src="https://farm6.staticflickr.com/5584/14672643419_807619aacc.jpg" title="cleaner"/>
</div>

The main reason not to put the complex logic into your views is, of course, testing. I don't want to say that it is impossible to test logic defined in views, but it is much more complicated. And, as a very lazy person, I don't like doing an extra work.

<!--cut-->

The second reason is that views should have as little  embedded dynamic code as possible. This gives us much cleaner code which is easy to modify and maintain.

In our company we have a few simple conventions about logic in views:

- The *Use only one dot* rule. Which is also known as the [Law of Demeter]. You should try to avoid expressions that are accessible with more than 1 dot. For example,  `@user.current_ledger.articles`. It is obvious that you should make this call in controller, not in views.

- Don't hit database in views. This mistake is just as obvious as it is common. You should not make database calls inside views.

- Avoid the variables assignments inside views. You should not make any computations in the views. They should only display already computed values.

There are some common practices to resolve logic-less views problems. Let's take a closer look.

### What is wrong with helpers?

Rails gives us a powerful tool named helpers. You can define methods inside those modules and then magically use them inside your views. Cool! We can put logic inside those modules and forget about our problems!

Here I will give you the list of what I don't like in helpers:

- Helpers are often being used to retrieve data from the db. An example: `visible_comments_for(article)`

- A big number of helpers are generating html tags with ruby. In this case when I need to modify the markup, I will have to modify all the helpers, not markup files. The helpers should format data, not generate markup.

- It is not obvious what is the receiver object of the helper method. This call `prepare_output(article.body)` reminds me about global procedures and functions. C'mon, this is an OOP world, why the stuff like that is still alive here?

- Helper functions are defined inside modules, so we don't have the power of inheritance (we can mix modules with modules, but that is not the same).

- It is hard to track helpers dependencies on another helpers. I've seen a lot of helpers that are calling another ones not from their native module.

- The testing is much easier, but still not perfect.

### Fat models

This is not an option in the real world, but it deserves to be mentioned in this list. We can encapsulate all our views logic inside models. Of course, this will lead us to 1000 lines of unmaintainable code. But, finally, we can test it easily and have a working inheritance.

To avoid model code overgrowth we can define all views-related logic in modules and then include them into model class. But still, we have one monolith class with hundreds of public methods.

### Decorators

To separate views-related logic from models folks from OOP world are using the [Decorator pattern]. This pattern allows to add behaviors to a single object. In rails world we have a few gems implementing this pattern. The alive one is [draper] gem. It has a cool DSL not only for decorating your models, but also for decoration of their relations. So, you can build the whole decorators tree using simple `Model.decorate` method.

The decorator pattern was designed for replacing your object with the new one with additional functionality, so you can use your decorator objects as you would use your models objects.

The testability of this solution is very high. You can instantiate decorators with stubs without hitting the database in the most of your test cases at all.

The usage of decorators is the cool and clean solution. But what if I need some really complicated logic to build the view that is based on 2 non-relative models? What if my logic is not related to models at all? The second name of the Decorator pattern is Wrapper. What should I wrap?

### View object

I present to you View Objects! The View Objects concept is simple. All the logic you need in views should go into the View Objects.

The View Object sometimes can be the simple decorator. This happens when your view logic depends only on the model data. In this case you need to "add custom behavior" to an object, this is where decorator suits perfectly:

{% highlight ruby linenos=table %}
class DiscussionViewObject
  attr_reader :discussion

  delegate :name, :created_at, to: :discussion

  def initialize(discussion)
    @discussion = discussion
  end

  def name_with_time
    @name_with_time ||= created_at.strftime('%Y/%m/%d') + name
  end
end
{% endhighlight %}

The second case is when your view logic is based on several not connected models or even on the request. When you are facing this problem the View Object can implement the "Presenter" part of the MVP pattern.

The *MVP* (Model-View-Presenter) is a pattern well-known in C#/Java world. It is mostly used to build interfaces (views, in our case). It allows us to separate concerns: the model encapsulates domain logic, the presenter takes all the view logic and the view [knows nothing].

The main difference between 'classic' presenters and our ones is that we still have a controller that receives user's inputs and commands. 

Here is the View Object that implements the logic from the 2 unrelated models:

{% highlight ruby linenos=table %}
class IssuesPresenter
  attr_reader :issues, filters

  def initialize(issues, filters)
    @issues, @filters = issues, filters
  end

  def has_selected_filters?
    filter.any?
  end

  def all_issues_are_resolved?
    issues.all?(:resolved?)
  end
end
{% endhighlight %}

The View Object allows you to build complex page logic using simple view logic wrappers.

As in the case with decorators, you should instantiate the view objects at the end of your actions. The controller should process given parameters, select necessary models, instantiate view objects and then give control to view (render it).

The view can use view objects methods along with models methods if that is necessary, but I don't recommend mixing them inside one view.

You can have as many view objects as you want. When you need some unique logic, you will have 1 view object per action and when you have the repeating logic, you can reuse your view objects in multiple actions.

But you should not stick to your actions. For example, if one of your layouts has a complex logic depending on the current controller state, then you can create View Object for it and instantiate it in actions where you are using it (with `before_filter` for example).

The main pros of using this solution are:

- View Objects are the [PORO], so you can use all cool OOP features ruby has: mixins, inheritance, etc.

- View Objects are not bound to models directly, so you can use them when the decorator does not suit properly.

- Test View Objects logic is as easy as test ruby classes. As in decorators solution, you can feed View Objects with stubs to increase the tests speed.

[Law of Demeter]:http://en.wikipedia.org/wiki/Law_of_Demeter#In_object-oriented_programming
[Decorator pattern]:http://en.wikipedia.org/wiki/Decorator_pattern
[draper]:https://github.com/drapergem/draper
[knows nothing]:http://youtu.be/Pkyy57iMaB0
[PORO]:http://blog.jayfields.com/2007/10/ruby-poro.html

Image courtesy of Vectorolie/ FreeDigitalPhotos.net


