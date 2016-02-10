---
layout: post
author: Mark Volosiuk
authors_git: marchi-martius
title: 'Test Driven Thinking for Solving Common Ruby Pitfalls'
date: 12-12-2014
tags:
- rails
- ruby

categories:
- blog
- tech
---

<img src="https://cloud.githubusercontent.com/assets/5908100/5414726/f67c727e-8229-11e4-89e8-06d2368a8f16.jpg" class="left" style="margin-right: 1em;" />

*-- Comrade! Our Great Leader requests a web-service for his Despotic Duties!
He has chosen you for completing the Booletproof Automate Bloody Repression Machine
with REST API, Authorization and other munchies for glory of the Empire.*

OK, does it look like a regular specification for your customer's new project? As
professional developers we definitely can handle this. Let's dive into our goals:

* We have to research the domain of bloody repressions
* Define pros and cons of existing systems
* Continously deliver product for Leader's demands
* Bug should not pass (we know that repression isn't your uncle's joke)

<!--cut-->

So first things first, what do we know about the domain:

1. We know that the Dictator has an absolete authority.
2. Dictator assigns bureax to manage nation's everyday needs.
3. Dictator dictates through his adjustants. They have an executive power all across the 
Empire.
4. Bureax deal with external APIs, such as labor unions or regional authorities.

We can work with this knowledge now. After coding for a few weeks (yes, we are using
the basic TDD approach) we have a pretty common Rails application with a pretty traditional
structure:

* Basic resource controllers.
* Models:

{% highlight ruby linenos=table %}
class Dictator < ActiveRecord::Base
  ...
end

class Bureau < ActiveRecord::Base
  ...
end

class Adjutant < ActiveRecord::Base
  belongs_to :dictator
  ...
end
{% endhighlight %}

This is a pretty common situation when developers start using a framework instead of a 
plain old OOP. Because it's easy enough to `rails generate` working solution fast.
In some cases this is what you need, but often this approach leads the developer to
bloated, nearly untestable system with ~1000 LOC per model.

### Pitfall One: Bloated models

But what if instead of `generator` approach we will write specs first.

{% highlight ruby linenos=table %}
describe Dictator do
  it "has authority to manage bureaux"
  it "is Great Leader"
  it "exclusively owns military forces"
  ...
  ...
  ...
  it "has many airplains"
  it "can write a book"
  ...
end
{% endhighlight %}

This is what we can see in many projects. Models have so many aspects of domain to 
deal with:

* Permissions management
* Inner state logic
* Attributes
* Relations with other models
* Aggregating and collecting data
* Processing logic for output
* Parsing income data
* etc...

Even with empty specs we can measure model size *before* it becomes a mainteiner's
nightmare. With that in mind we can start with separating of concerns early. And
instead of huge Dictator model we can build something like this:

{% highlight ruby linenos=table %}
Dictator = Struct.new(:full_name, :title, :date_of_birth) do
  ...
end

$dictator = Dictator.new(...).freeze

class Authority
end

class MilitaryPolicy
end

class Property
end
{% endhighlight %}

You may ask me now: What all those text above means? Where the hell are controllers,
views, gems and other stuff ruby-on-rails developers are dealing with? Any of tools for
faster write/run tests?

### Pitfall Two: Environment dependency

To finish this nonsence I'll try to conclude:

1. Avoid starting project with tools, web-frameworks, test-suites, libs or other
type of strict dependency (thousands of them!). Start with a clean critical look at 
domain.
2. You should be able to explain how system works to anyone. There is probably the 
lack of your knowledge in system if you cannot explain it clear enough.
3. Think about specification. With separation of concerns in mind you can start to
write little pieces of a large system in isolation (unit testing).
4. Test those pieces together with some integration and interaction between them.
5. Using this approach you'll have a large part of business logic without Rails
engaged at all. Test suite runs much faster without application preloading.
6. With a huge amount of logic extracted from ActiveRecord models you can use it for
the only purpose it exists: persistence management. Now validations, scopes and
callbacks can be used safely (almost).
7. With system growing you may want to add layers of indirection. It is much
easier to compose small low-level pieces into something like facades then to decompose
heavy tightly-coupled monolithic models.

So I use the rule of thumb for myself: try to test before code *and* try to think
before test.
Anyway, thank you for reading, hope it was not _that_ boring. :)

*Fin*


