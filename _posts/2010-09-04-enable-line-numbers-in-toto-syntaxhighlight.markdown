---
layout: post
title: Enable Line Numbers in Toto Syntaxhighlight
author: Michael Nikitochkin
authors_git: miry
date: 04-09-2010
tags: ruby,toto
category: tech

---

  Syntax Highlighting by [Rack::CodeHighlighter](http://github.com/wbzyl/rack-codehighlighter) gem has a bug. Maybe I have taken wrong steps. But by default __CodeRay__ is disabled to show line numbers for code. I have not found any options to enable it by __CodeHighlighter__. So input next lines in __config.ru__ will show line numbers.

{% highlight ruby linenos=table %}
CodeRay::Encoders["html"]::DEFAULT_OPTIONS[:line_numbers]=:inline
{% endhighlight %}

<!--cut-->

  But I have a problem with __css__. I found that __CodeHighlighter__ does not generate not correct html for __CodeRay__. Default theme css for Toto breakes this highlighting too. You can use my fixed [coderay.css](/css/coderay.css) for Toto.
