---
layout: post
title: Add New Conditions to Searchlogic Sample by Range
date: 1-12-2009
author: Michael Nikitochkin
authors_git: miry
tags: rails,searchlogic
category: tech
excerpt: Three simple steps to fix bugs with Postgres.
---

I am using an awesome plugin searchlogic by binarylogic. But it has some small bugs concerning working with Postgres.

Issue: Add time interval for conditions.

We need to add only three small steps in file vendor/plugin/searchlogic/named_scopes/conditions.rb:
First of all, add a conditon before a line `CONDITIONS = {}`:

{% highlight ruby linenos=table %}
RANGE_CONDITIONS = {
  :range => [],
  :not_range => []
}
{% endhighlight %}

The second step: register our conditions, write after line `CONDITIONS={}`:

{% highlight ruby linenos=table %}
RANGE_CONDITIONS.each { |condition, aliases| CONDITIONS[condition] = aliases }
{% endhighlight %}

The third step: write our query in the method *create_primary_condition* find case and add next exprs:

{% highlight ruby linenos=table %}
when "range"
  scope_options(condition, column_type, "#{table_name}.#{column} > ? and #{table_name}.#{column} < ?")
when "not_range"
  scope_options(condition, column_type, "#{table_name}.#{column} < ? and #{table_name}.#{column} > ?")
end
{% endhighlight %}

Go to console and type some query: User.created_at_range(1.month.ago, 1.day.ago)
Wuala, we have all users for that period.

