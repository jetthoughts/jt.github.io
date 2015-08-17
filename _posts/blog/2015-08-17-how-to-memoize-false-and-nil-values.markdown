---
layout: post
author: Hnat Kubov
authors_git: hnatt
title: How To Memoize False and Nil Values
description: Memoization is a useful technique which helps to achieve cleaner and more efficient code. When some expensive method of an object is called, we save its value to an instance variable, so that we don't have to do those heavy calculations again.
date: 17-08-2015
tags:
- rails

categories:
- blog
- tech
---

<img src="http://videos.web-03.net/diagramacao/eduardo/mrbool/begindiffjavap2/figure1.png" class="left" style="margin-right: 1em;" />

**TL;DR: if method can return false or nil, and you want to memoize it, use `defined?(@_result)` instead of `||=`.**

Memoization is a useful technique which helps to achieve cleaner and more efficient code. When some expensive method of an object is called, we save its value to an instance variable, so that we don't have to do those heavy calculations again.

<!--cut-->

<br><br><br><br><br><br><br><br><br><br><br>

{% highlight ruby linenos=table %}
class Book
  def word_count
    @_word_count ||= sections.sum do |section|
      section.paragraphs.map(&:text).sum { |para| para.scan(/\w+/).size }
    end
  end 
end
{% endhighlight %}

The `||=` is a conditional assignment operator which translates as: *"if left side is truthy (not `false` and not `nil`), then stop right there; otherwise assign right side to the left side"*. And since in Ruby the last statement gets returned by a method, in one case it returns result of `sections.sum`, and in other case the previously assigned instance variable `@_word_count`.

This idiom is so simple that it's easy to start using it everywhere without much thinking. But there are cases where it won't work. We talk about *falsey* values. Consider the following methods, one of which tells if the book is referenced from any other book, and other finds the last book that referenced this one:

{% highlight ruby linenos=table %}
class Book
  def referenced_elsewhere?
    @_referenced_elsewhere ||= Book.where(some_complex_and_expensive_query).exists?
  end 
  
  def last_referenced_from 
    @_last_referenced_from ||= Book.where(some_complex_and_expensive_query).first
  end 
end
{% endhighlight %}

If the book was referenced by any other book, these methods will work as expected. Otherwise they will work too, but the memoization won't ever kick in, and the complex and expensive query will be executed every time the method is called. That is because `false` or `nil` on the left side make the conditional assignment `||=` always proceed to the assignment part.

So if a method can return `false`, the memoization should take it into account, like this for instance:

{% highlight ruby linenos=table %}
  def referenced_elsewhere?
    return @_referenced_elsewhere unless @_referenced_elsewhere.nil?
    @_referenced_elsewhere = Book.where(some_complex_and_expensive_query).exists?
  end
{% endhighlight %}

This looks not so laconically as the previous one, but it works for boolean results.

A careful reader would have noticed though, that this way we ignore `nil` values when `nil` is a potential result. ActiveRecord's `exists?` can't possibly return `nil`, so we're safe there, but `.first` can, and so the `some_complex_and_expensive_query` will hit the database on each call to `last_referenced_from`. There's got to be a better way! And there is!

{% highlight ruby linenos=table %}
  def last_referenced_from 
    return @_last_referenced_from if defined?(@_last_referenced_from)
    @_last_referenced_from = Book.where(some_complex_and_expensive_query).first
  end 
{% endhighlight %}

`defined?` is Ruby's reserved word to check if expression is currently defined. Once we assign anything, including `nil`, to `@_last_referenced_from`, `defined?(@_last_referenced_from)` returns String value `"instance-variable"`, which is truthy. It will work for all kinds of values, including also `false`.

To sum up, `||=` is too good to forget about it, but when doing memoization, just think if the result may be boolean or `nil`, and if yes, use `defined?`.
