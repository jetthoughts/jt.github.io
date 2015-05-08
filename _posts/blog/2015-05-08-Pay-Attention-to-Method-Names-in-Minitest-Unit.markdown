---
layout: post
author: Hnat Kubov
authors_git: hnatt
title: Pay Attention to Method Names in Minitest::Unit
date: 08-05-2015
tags:
- rails

categories:
- blog
- tech
---

<img src="https://cloud.githubusercontent.com/assets/5908100/7536556/915f937e-f599-11e4-919f-e64d4fbbe445.jpg" class="left" style="margin-right: 1em;" />

**TL,DR: don't define any methods with names `name`, `message`, `time`, `pass` in `Minitest::Unit` test cases unless you really want to override those of `Minitest::TestCase`.**

When writing `Minitest::Unit` tests, it's convenient to use test case's instance methods as kind of RSpec's lazy-evaluated `let`-blocks or various helper methods.

<!--cut-->

{% highlight ruby linenos=table %}
class TrialPeriodVideoDownloadTest < ActiveSupport::TestCase
  def user
    users(:trial_period_bob)
  end

  def video
    videos(:fullhd_video_private)
  end

  test 'trial user can download private video' do 
    travel_to user.registered_at
    assert VideoPolicy.new(user, video).download?
    travel_back
  end

  test 'trial user cannot download private video after trial ended' do 
    travel_to user.registered_at + 32.days
    refute VideoPolicy.new(user, video).download?
    travel_back
  end
end
{% endhighlight %}

*Note: I am extending `ActiveSupport::TestCase` for this nice `test "verify something"` DSL and for other handy features provided by `ActiveSupport::Testing`, but the problem concerns `Minitest::TestCase`, which is being inherited behind the scenes.*

In this case, when only one user and video are involved in the test, it seems reasonable to name the methods `user` and `video` accordingly, and not `trial_user`, `user_bob` and `fullhd_private_video` to distinct them from other tested objects.

One thing to keep in mind when using such general names for methods is that Minitest::TestCase has its own instance methods. Consider this case, quite similar by its spirit to the previous:

{% highlight ruby linenos=table %}
class MessageDeliveryTest < ActiveSupport::TestCase 
  def message 
    messages(:draft_from_bob_to_alice)
  end 

  test 'changes status to sent after sending' do 
    MessageDelivery::Send.new(message).perform 
    assert message.reload.status?
  end

  test 'changes status to delivered after delivering' do 
    MessageDelivery::Deliver.new(message).perform 
    assert_equal 'delivered', message.reload.status
  end
end
{% endhighlight %}

Surprisingly, one of these tests will fail with a mysterious error message: `ArgumentError: wrong number of arguments (2 for 0)`, with lines `def message` and `assert_equal 'delivered', message.reload.status` in backtrace.

It becomes clear after looking on `Minitest::Assertions#assert_equal` code:

{% highlight ruby linenos=table %}
def assert_equal exp, act, msg = nil
  msg = message(msg, E) { diff exp, act }
  assert exp == act, msg
end
{% endhighlight %}

Apparently, we unintentionally overloaded an instance method `message`, used internally by the test case for displaying customized failure messages.

Fortunately there are not many methods with such general names which can possibly cause confusion. From a brief eye-scan of contents of `Minitest::TestCase.instance_methods`, I can list only four names which people might want (but shouln't, for the reason explained above) to use for helper methods in their test cases: `time`, `message`, `pass` (I can imagine an app having a Pass model for passports), `name`. There are many other methods, but their names are too specific. If somebody overloads `assert_in_epsilon`, we can assume one knows what he's doing, but overloading of `message`, `name` or `time` may be unintentional and can lead to unexpected results.

It's fair to note that `Minitest::Spec` warns its users when they try to use these reserved names for `let`-blocks. Try to define things like:

{% highlight ruby linenos=table %}
let(:name) { 'Bob' }
{% endhighlight %}

--and your test won't load:

    ArgumentError: let 'name' cannot override a method in Minitest::Spec. Please use another name.

`Minitest::Unit` on the other hand is more straightforward and lets you do whatever you want.
