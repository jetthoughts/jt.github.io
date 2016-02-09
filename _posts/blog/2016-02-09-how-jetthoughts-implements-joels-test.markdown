---
layout: post
author: Igor Kirichenko
authors_git: shyjt
title: How JetThoughts implements Joel’s test?
description: Our experience in creating a flexible workflow for a tight deadline.
date: 08-02-2016
tags:
- workflow

categories:
- blog
- team
---

For those of you who don’t know who Joel Spolsky is here are some facts:

- Worked at Microsoft
- Founded [Fog Creek Software](https://www.fogcreek.com), [Stack Exchange, Inc](http://stackexchange.com/about). 
- Guilty for the world to see some interesting web products:

<img src="https://cloud.githubusercontent.com/assets/5908100/12913580/4adda72e-cf28-11e5-8976-60786bbc7538.png"/>

- Wrote (an awesome post)[http://www.joelonsoftware.com/articles/fog0000000043.html] about test to rate the quality of software team.

<!--cut-->

###12 steps of Joel's test in reality of JetThoughts projects:

<img src="https://cloud.githubusercontent.com/assets/5908100/12913446/7126dd48-cf27-11e5-9de4-0ae3554f7c96.jpg"class="left" style="margin-right: 1em;" />

####Do you use source control?

Hell yeah! Is there anyone who still develops software without using source control in 2016?! We use git as it is comfortable, reliable and modern. 

####Can you make a build in one step?

Yes, we can! Rolling out new code updates, features and hotfixes is what we do constantly. At context of our web projects written with Ruby on Rails, it’s a question of a single command to start deploy. For this purpose we use capistrano https://github.com/capistrano/capistrano

####Do you make daily builds?

To cover this part we run tests on CI on every commit pushed. This allows us to track project state and react right away if anything went wrong. What I really think we need to borrow from Joel experience is having the last guy who messed up build being responsible(“babysitting”) builds until someone else breaks it.

####Do you have a bug database?

We keep an eye on bugs using github issues. It totally meets our needs in having track on bugs. Steps to reproduce, expected and buggy behaviour is described in the issue description. Developer can be assigned to certain bug. Fixing bug can be planned using milestones or adding a label.

####Do you fix bugs before writing new code?

Sure, bugs should be fixed before writing new code. At the same time, bugs can be totally different. So when S&S comes to you with ‘we have bug, a button is aligned to the left!’ you should track and schedule this, but this bug does not prevent you from writing new code as it’s not crucial.
Do you have an up-to-date schedule?

It’s always hard to get any estimation from a developer. It’s getting even harder when you ask to give the precise estimation. But a client wants to know when issues will be done. We provide estimations for the client if task requirements are clear and precise. Otherwise, we provide the time needed to give an estimation, this time might be spent on reproduction of a bug, investigation of an issue or it’s cause, making a spike (google ‘agile spike’ to familiarize|add post about spikes to JT blog?!) to try some solution. Estimating and scheduling are important for R&D team as well - these make you decide issues importance and priorities. This way most needed and valuable changes will be done first.

####Do you have a spec?

It depends. Since JT is mainly an outstaffing company, it relies on client/project communication flow. But I think we have specs in every project we develop, the only thing that varies is a definition of spec. It could be wireframes, user stories, even an idea that client passes to R&D leaving more freedom for developers.

####Do programmers have quiet working conditions?

Not always. Developers get distracted to answer someone’s questions, review PRs, have lunch, etc. To reduce the factor of distraction we are coming up with daily (if needed) meeting to sort out most of the questions right away. This allows developers to focus on their tasks for the rest of the day.

####Do you use the best tools money can buy?

No. Our minimal stack consists of tools that are free(at least for some capacity used). Using best(and most expensive) tools depends on clients needs and will. I guess this agile approach is comfortable for clients.

####Do you have testers?

✔. QA is needed for the quality product. Period.

####Do new candidates write code during their interview?

Yup. It’s taking most of the interview time. A candidate is asked to solve some coding tasks. Tasks have different difficulty to meet different developer skill levels. Tasks cover both programming/algorithmic and language/technology purposes. Flavoured with common interview questions it gives you a complete image of a candidate.

####Do you do hallway usability testing?

Not really. We complete this by having meetings and QA’s.

I guess Joel test is useful to rate the quality of a software team. Cases may vary and you will need to come up with ideas on how to complete some of the steps, I hope vision of steps completion in JetThoughts will help you with that.
