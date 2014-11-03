---
layout: post
author: Igor Kirichenko
authors_git: shyjt
title: 'Our Default Ruby Development Stack'
date: 03-11-2014
tags:
- rails

categories:
- blog
- team
---
<div class="left" style="margin-right: 1em;">
    <img src="https://cloud.githubusercontent.com/assets/5908100/4884942/7d47496a-6370-11e4-8bbd-897931ce3da7.jpg" title="default_ruby"/>
</div>

Not that long ago I joined **JetThoughts**. By this time I learned team, workflow, colleagues minds(just a little) and technologies used to build applications.

**Development** is based on agile methodologies which means that clients are continuously getting new or changed functionality for their product deployed and maintained.

Applications I know about written in **Ruby on Rails**. Technologies used by team are mostly common for RoR developers but therefore flexible to meet clients requirements. We use both default(omakase) and advanced technologies stacks.

The most common **database choice** is PostgreSQL but MongoDB or any other SQL(which relates to default stack), or NoSQL database can be used too. 

<!--cut-->

**Front-end technologies** are ERB, Haml, Bootstrap, Javascript, Coffeescript, AngularJS. 

**ERB** - I guess you guys all know about it. It belongs to default stack. Erb allows us to embed :surprise: ruby code into text documents, we use it in html templates. It can be topped with bootstrap to get the flavour of multiple device and screen size support. 

Then comes up **haml**, lightweight markup language that helps us to markup our templates easier and faster. 

**Javascript** and **СoffeeScript** both let you add some dynamics to your application. From rails version 3.1 СoffeeScript goes default. Someone might not like coffee, but who cares? You can always remove it from your project. **AngularJs** is a front-end web framework. Angular is maintained by Google for single-page applications. One day I will use it too, but that is way other story.

For asynchronous tasks handling we use either sidekiq or delayedjob. DelayedJob uses SQL database for storage. Sidekiq uses redis for storage and gives better performance for massive jobs.

**Testing.** First it requires some test data. For these  purposes we use fixtures/factory girl. I'm not gonna dive deep into argues which one to use, just need to mention that fixtures belong to omakase stack. After setting up the test data you are ready to write unit tests. At  JetThoughts we do it using Minitest and Rspec. Rspec got its DSL magic, Minitest goes more ruby way. For integration testing we use capybara and phantomjs. As a preloader we use Spring, it keeps application running in background significantly reducing time spent to run test. Tests are run locally as well as on continuous integration server running Teamcity.

**For writing code** we use vim sublime and RubyMine. Most of team uses RubyMine because it is IDE, not just a text editor, and its magic simplifies coding process. I still can't get used to it so my choice is vim+plugins. Written code is stored in Github or Bitbucket. I guess Github is an obvious choice:

* user-friendly interface eases team collaboration;
* community choice.

Result products can be deployed almost on every server able to run Ruby, but for staging we often using Heroku as it requires minimum setup and can run a lot of different versions easily. Also we use Chef to automate servers setup.

Many opensource libraries/gems also used for development to achieve fast and convenient result. Our developers contribute to most of these projects paying tribute and supporting community.

Whole team masters default stack technologies, the rest is optional. As my spiritual mentor once said: "You can do everything with a blade. If you can't solve problem with blade than you are causing the problem." I consider this is a metaphor which means omakase stack is enough (and more than enough) to build an application. That's why we relate to omakase stack as to base stack. Team can decide whether they need anything unusual.
