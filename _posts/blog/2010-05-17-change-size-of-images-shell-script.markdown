---
layout: post
title: Change Size of Images Shell Script
date: 17-05-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- shell
- imagemagick
categories:
- blog
- tech
excerpt: How to resize images.

---

I had a issue: Find all images in directory and change size to "150x200". So let's start.

1. Find all images **find .**
2. Convert size of image: **convert -geometry '150x200' image.gif image.gif**

{% highlight ruby linenos=table %}
for i in $(find .)
do
  convert -geometry "150x200" $i $i
done
{% endhighlight %}

If you want to get only image size use: *identify image.png*
