---
layout: post
date: 28-08-2013
title: "RubyMotion Tips: Universal lookup for right ProvisioningProfile"
author: Michael Nikitochkin
authors_git: miry
tags: ruby motion config rakefile
categories:
- blog
- mobile

---

I would like to share my experience of setting up `provisioning_profile` for general Rubymotion project.

I have found the following line in Rubymotion Library: [config.rb#L79](https://github.com/HipByte/RubyMotion/blob/cfc7bfdb3c17c5059a98152d7c472e13eb55f8ea/lib/motion/project/template/ios/config.rb#L79)

{% highlight ruby linenos=table %}
def provisioning_profile(name = /iOS Team Provisioning Profile/)
  # ....
end
{% endhighlight %}

And this method allows us to search for ProvisioningProfile not just by full path as it is described in documentation.
But you can find the ProvisioningProfile via name.

<!--cut-->

Example:
You have created the provisioning profile with the name `MagicMotionAppProfile`. Use the next snippet to find the profile.

{% highlight ruby linenos=table %}
Motion::Project::App.setup do |app|
  app.provisioning_profile('MagicMotionAppProfile')
end
{% endhighlight %}

After this trick we can share the code between developers and forgot to update the `Rakefile` after a new profile generation.

I use the next filename convention: *Use same profile name as for application name*.
And I can do the following:

{% highlight ruby linenos=table %}
Motion::Project::App.setup do |app|
  app.name = 'MagicMotion'
  app.provisioning_profile app.name
end
{% endhighlight %}

