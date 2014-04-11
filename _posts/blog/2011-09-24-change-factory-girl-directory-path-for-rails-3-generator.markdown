---
layout: post
title: Change Factory Girl Directory Path for Rails 3 Generator
date: 24-09-2011
author: Michael Nikitochkin
authors_git: miry
tags:
- rails
- rspec
categories:
- blog
- tech

---

After Rails 3.1 + Rspec + FactoryGirl setup, all factories are generated to __test/factories__ instead of  __spec/factories__.
Solution is to add to your __application.rb__:

{% highlight ruby linenos=table %}
g.fixture_replacement :factory_girl, :dir => 'spec/factories'
{% endhighlight %}

<!--cut-->

So we have:

{% highlight ruby linenos=table %}
config.generators do |g|
  g.template_engine :haml
  g.test_framework :rspec, :fixture_replacement => :factory_girl, :views => false, :helper => false
  g.view_specs false
  g.helper_specs false
  g.fixture_replacement :factory_girl, :dir => 'spec/factories'
end
{% endhighlight %}
