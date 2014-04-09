---
layout: post
title: Show Not Valid CSV Lines with Sed
date: 21-09-2010
author: Michael Nikitochkin
authors_git: miry
tags: sed,shell,csv
category: tech

---

I have an issue with invalid formatted CSV file. First step show lines with invalid lines.

{% highlight bash linenos=table %}
sed -n '/"[^",]*"[^",]*"[^",]*",/,1p' <fileName>
{% endhighlight %}

<!--cut-->

Then I googled a way to replace symbol inside quotes. And I read the next manual http://sed.sourceforge.net/sed1line.txt. So I created a sed script with the next content, called it __script.sed__:

{% highlight bash linenos=table %}
s/\",\"/\$XXXX\$/g;
:a
s/\([^,]\)"\([^,]\)/\1'\2/g
ta
s/\$XXXX\$/\",\"/g;
{% endhighlight %}

Next we just do:

{% highlight bash linenos=table %}
sed -f script.sed <fileName>
{% endhighlight %}

And we get a normal csv format file in the output. Next we just add the argument to apply that in this file.

{% highlight bash linenos=table %}
sed -i .bak -f script.sed <fileName>
{% endhighlight %}
