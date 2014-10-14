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

![sorting_hashes](https://farm4.staticflickr.com/3954/14914812874_021a2414a1.jpg)

In one of the applications, that we are developing, we needed to implement the storing of 10 last user search requests. If they were simple text queries, that would be the end of the story. However, the issue turned out to be much more complicated, because we had to save search filters.

<!--cut-->

In general, the search filter may be represented as a set of attributes, such as:

{% highlight %}
price_min: 100,
price_max: 1000,
color: 'red'
{% endhighlight %}

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
