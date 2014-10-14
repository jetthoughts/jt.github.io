---
layout: post
author: Valeriy Mironov
authors_git: valeronm
title: 'Recent Searches & Sorting Hashes: How They are Connected'
date: 14-10-2014
tags:
- rails

categories:
- blog
- tech
---

<div class="left" style="margin-right: 1em;">
    <img src="https://farm4.staticflickr.com/3954/14914812874_021a2414a1_n.jpg" title="sorting_hashes"/>
</div>

In one of the applications, that we are developing, we needed to implement the storing of 10 last user search requests. If they were simple text queries, that would be the end of the story. However, the issue turned out to be much more complicated, because we had to save search filters.

In general, the search filter may be represented as a set of attributes, such as:

{% highlight text linenos=table %}
price_min: 100,
price_max: 1000,
color: 'red'
{% endhighlight %}

<!--cut-->

On one hand, with the help of all these attributes, we can simply create a model. But on the other hand, it is not a beneficial way, because there are quite a lot of filter attributes. Obviously, we should be able to add these attributes easily. I believe that the easiest way to do so is to keep them as a hash in the model in the serialized field.

{% highlight ruby linenos=table %}
# Our new model
class SearchFilter
  belongs_to :user
  serialize :filter
end

# And association for it in users
class User
  has_many :search_filters
end
{% endhighlight %}

Since we need only the last 10 filters, we will add a callback that deletes old search filters after creating new ones.

{% highlight ruby linenos=table %}
after_create :trim_old_filters

private

def trim_old_filters
  user.search_filters.order(updated_at: :desc)
    .offset(10).destroy_all
end
{% endhighlight %}

Also, as we would like to avoid the saving of identical filters, we will check the uniqueness of created filters.

{% highlight ruby linenos=table %}
validates :filter, uniqueness: { scope: :user_id }
{% endhighlight %}

But here we come across with one feature of this validation. It will allow to save identical filters, if attributes in them will be in a different order.

That means, it will allow to store in the database both the hash `{ price_min: 100, color: 'red' }`, and the hash 
`{ color: 'red', price_min: 100 }`, although Ruby will return true when comparing for equality.

This happens because before the validation ActiveRecord serializes the hash in a text string. In addition it makes a request to the database to retrieve the rows with the same value.

{% highlight ruby linenos=table %}
{ price_min: 100, color: 'red' }.to_yaml
#=> "---\n:price_min: 100\n:color: red\n"

{ color: 'red', price_min: 100 }.to_yaml
#=> "---\n:color: red\n:price_min: 100\n"
{% endhighlight %}

As you can see, the lines are completely different.

[Official documentation](http://www.ruby-doc.org/core-2.1.2/Hash.html) says:
> Hashes enumerate their values in the order that the corresponding keys were inserted.

Obviously, the hash serialization occurs in the same order in which values are added to the hash.

As a result, we have to make all hashes enumerated in the given deterministic order before writing or checking for the presence in the base. In other words, we need to sort the hash is such a way that it is always enumerated in the alphanumeric order of its keys.

So, there are many ways to do that. But it would be no fun just to pick any of them at random. Therefore, we decided to find the best way of doing that by two characteristics: speed and readability.

To begin with, let's talk about speed. 

We have created a hash:

{% highlight ruby linenos=table %}
KEYS_IN_HASH = 20
h = (1..KEYS_IN_HASH).to_a.shuffle.inject({}) { |hash, v| hash[v] = v.to_s; hash }
{% endhighlight %}

And benchmarked some ways of sorting it:

{% highlight ruby linenos=table %}
require 'benchmark'
Benchmark.bm do |x|
  # sorting by #sort and converting to hash by ruby 2.0 method #to_h
  x.report(:sort) { h.sort.to_h }

  # sorting by #sort and converting to hash by creating hash from array of key/value arrays
  x.report(:old_sort) { Hash[h.sort] }

  # sorting by #sort_by and converting to hash by ruby 2.0 method #to_h
  x.report(:sort_by) { h.sort_by { |k, v| k }.to_h }

  # sorting by #sort_by and converting to hash by creating hash from array of key/value arrays
  x.report(:old_sort_by) { Hash[h.sort_by { |k, v| k }] }

  # creating new hash and set values in needed order
  x.report(:new_hash) { nh = {}; h.keys.each { |k| nh[k] = h[k] }; nh }

  # creating new hash and filling it while iterating by inject
  x.report(:new_hash_inj) { h.keys.inject({}) { |nh, k| nh[k] = h[k]; nh } }

  # removing and readding values to hash in the needed order
  x.report(:by_deleting!) { h.keys.sort.each { |k| h[k] = h.delete k }; h }
end
{% endhighlight %}

And here are results which we have got:

For 20 keys in hash:

{% highlight text linenos=table %}
       user     system      total        real
new_hash      0.000000   0.000000   0.000000 (  0.000015)
new_hash_inj  0.000000   0.000000   0.000000 (  0.000015)
by_deleting!  0.000000   0.000000   0.000000 (  0.000017)
sort_by       0.000000   0.000000   0.000000 (  0.000024)
old_sort      0.000000   0.000000   0.000000 (  0.000038)
old_sort_by   0.000000   0.000000   0.000000 (  0.000042)
sort          0.000000   0.000000   0.000000 (  0.000050)
{% endhighlight %}

And for 100 items:

{% highlight text linenos=table %}
       user     system      total        real
new_hash      0.000000   0.000000   0.000000 (  0.000046)
new_hash_inj  0.000000   0.000000   0.000000 (  0.000049)
by_deleting!  0.000000   0.000000   0.000000 (  0.000086)
old_sort_by   0.000000   0.000000   0.000000 (  0.000093)
sort_by       0.000000   0.000000   0.000000 (  0.000097)
sort          0.000000   0.000000   0.000000 (  0.000275)
old_sort      0.000000   0.000000   0.000000 (  0.000286)
{% endhighlight %}

And for 100'000 items:

{% highlight text linenos=table %}
       user     system      total        real
new_hash      0.090000   0.010000   0.100000 (  0.094235)
by_deleting!  0.120000   0.000000   0.120000 (  0.126402)
new_hash_inj  0.190000   0.000000   0.190000 (  0.193813)
sort_by       0.200000   0.010000   0.210000 (  0.202221)
old_sort_by   0.290000   0.000000   0.290000 (  0.295042)
sort          0.640000   0.010000   0.650000 (  0.668481)
old_sort      0.680000   0.000000   0.680000 (  0.689761)
{% endhighlight %}

And for 1'000'000 records (by the way, if you have a hash with 1'000'000 keys, then you are doing something wrong):

{% highlight text linenos=table %}
       user     system      total        real
by_deleting!  1.620000   0.010000   1.630000 (  1.656473)
new_hash      1.790000   0.030000   1.820000 (  1.885463)
new_hash_inj  1.810000   0.020000   1.830000 (  1.856330)
old_sort_by   3.650000   0.030000   3.680000 (  3.725720)
sort_by       3.760000   0.040000   3.800000 (  3.834567)
old_sort      8.860000   0.150000   9.010000 (  9.091311)
sort          9.610000   0.120000   9.730000 (  9.843766)
{% endhighlight %}

Consequently, we can see that creating a 'new hash' is the fastest way to sort a hash, less fast is 'by deleting!' (but it modifies an original array and this is not always allowed). And the shortest way ('sort')is also  the longest one (from 3x for 20 items to 7x for 1'000'000 items).

In my opinion, a 'sort by' method is a golden mean for sorting hashes. It is simple to understand what it does, it is not so time-consuming as a 'sort' method and not so difficult to read as 'new hash'.

Although, we should remember that dealing with big hashes is a bad practice. And if small ones are used, users can't see any performance difference and 'sort' will work well too.

So, when we decided how we will organize a hash value, let's add this ordering before validation:

{% highlight ruby linenos=table %}
before_validation :sort_filter_attributes_by_its_names

private 

def sort_filter_attributes_by_its_names
  self.filter = filter.sort_by { |k, v| k }.to_h
end
{% endhighlight %}

The last thing to do is to write a method that will perform adding or updating of search filters:

{% highlight ruby linenos=table %}
def self.store(user, filter)
  search_filter = user.search_filters.create(filter: filter)
  return if search_filter.valid?
  
  user.search_filters.find_by_filter(search_filter).touch
end
{% endhighlight %}

Further, use this method in the controller action that handles user's searches.

{% highlight ruby linenos=table %}
class SearchController < ApplicationController
  after_action :store_filter

  def store_filter
    SearchFilter.store current_user, params[:filter]
  end
end
{% endhighlight %}

Finally, we have implemented storing of user's recent search filters and compared efficiency of sorting hashes in Ruby, used to enumerate in deterministic order.  
