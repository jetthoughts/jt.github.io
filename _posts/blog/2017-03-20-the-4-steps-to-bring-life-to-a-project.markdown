---
layout: post
author: Paul Keen
authors_git: pftg
title: The 4 Steps to Bringing Life to a Project
date: 2017-03-20
tags:
- business

categories:
- blog
- team
---

<img class="left" style="margin-right: 1em;" width="500" src="https://cloud.githubusercontent.com/assets/5908100/15746555/bbd76378-28df-11e6-82d0-380b18147fed.jpg"/>

In initial stages of our new business or a startup, when there is no clarity, we prefer to have short-term solutions for our product: hiring and changing contractors, delivering with [technical debts](https://martinfowler.com/bliki/TechnicalDebt.html), changing requirements often.

And finally we are beginning see some success, our product idea attracts customers and they are ready to pay for it.
With such an accomplishment, we could get more investment to improve and evolve it.

But it comes at a price. Short-term decisions reduce the velocity of delivering new features.
Maybe it’s better to drop off the previous solution and rewrite it taking into consideration all new knowledge, but we are not ready to support 2 products.
And it’s hard to sell such solutions to investors.

We want to invest into improving previous solutions and prepare a base for new features.

<!--cut-->

### Let’s summarize what we have:

1. [Darkness](#eliminate-darkness): There is no schedule and ideas what’s going on;
1. [Confuse](#eliminate-confuse): Lack of documentation and specifications of processes;
1. [Rust](#eliminate-rust): Developers spent a lot of time to deliver their work;
1. ["Deja Vu"](#eliminate-deja-vu): Huge number of repeated bugs.

To move forward we should eliminate all those problems and prevent their regression.

## Eliminate Darkness

![sky](https://cloud.githubusercontent.com/assets/125715/23949787/4d399f9c-0991-11e7-95db-ed1a7af8bc7a.jpg)

#### Signs of the Problem:

1. Do not see the progress in realtime;
1. The deadlines keep shifting;
1. Developers do not have a big picture and ask for the new tasks.

Most of our practices are based on [Lean](https://leankit.com/blog/2015/05/welcome-to-the-new-lean/) and [Kanban Methodology](https://www.atlassian.com/agile/kanban). They are simple and scalable.

And for this problem, let’s start from introducing [Kanban Board](https://leankit.com/learn/kanban/kanban-board/).

![agile_kanban_board](https://cloud.githubusercontent.com/assets/125715/23950038/553214f8-0992-11e7-94af-97955f48c2e8.png)

From a quick glance, we can see the following: What phases work is in, who is working on what, what work is blocked, where are bottlenecks.

By Kanban we change Schedule to use [Continuous Flow](https://leankit.com/learn/kanban/kanban-pull-system/): from pushing to pulling work.

**Our solutions:** [GitHub](https://github.com/) with [Waffle
Integration](https://waffle.io/)

## Eliminate Confuse

![weaving](https://cloud.githubusercontent.com/assets/125715/23949790/4fe2093c-0991-11e7-9463-659ae6ee30ce.jpg)

#### Signs of the Problem:

1. Setting up New Production, Staging or Development instances takes plenty of time, especially for newcomers;
1. There is a lot of implicit routine manual tasks to support processes;
1. There are Clear Experts on your team who “is the only one who knows about the production configuration”.

We eliminate such problem with *“Thoughtless Processes”* metaphor.
We expect that all processes should be clear and simple for anyone without relying on their expertise level.
Documentation of [Algorithms](https://en.wikipedia.org/wiki/Algorithm) is a good way of ensuring long and healthy life for the project and making maintenance easy.

So we make sure that the project delivering processes is sufficiently documented for the developers, and new team members don’t need a guidance from their colleagues to set up a development environment or to discover what technologies are used.
When a routine task can be automated, we do so. For example, automatically checking a pull request for code style violations and disabling the Merge button if any, is far more efficient than a written instruction “check code style before merge”.

**We automate such stuff:** Setup Environments, Running Tests, Code Style Checking, Auto-Deployment.

## Eliminate Rust

![auto](https://cloud.githubusercontent.com/assets/125715/23949780/48bd1c46-0991-11e7-9523-73dc2d9d3521.jpg)

#### Signs of the Problem:

Delivering of New Features takes plenty of time to update, integrate and verify
There is a support of Unreleased Features

For Software Development, Rust is the Staled Items, which have not been updated for some time, that you are not able to deliver.

### Smaller Changes

The smaller, more manageable tasks allow the project team to focus on high-quality development, testing, and collaboration.

We tried to prepare each work unit to be small, but sometimes we missed and while we are in progress we could split it into appropriate parts.

Popular [Feature Branching Strategy](https://www.atlassian.com/agile/branching) does not like small changes, so we moved to [Task Branching Strategy](https://www.atlassian.com/agile/branching).
This makes us have both from two worlds: to verify code before the merge and smooth out the amass tremendous risk when it’s time to merge them.

**Sizes matters:** 2 days per Item

### Setup WIP Limit

Kanban helps us eliminate Staled Code by limiting Work In Progress are preventing the team from starting work that hasn’t been finished yet.

**Our Limits:** Each Person focuses on 2 Items only

## Eliminate “Deja Vu”

![enshtein](https://cloud.githubusercontent.com/assets/125715/23951257/4a4f8a94-0996-11e7-9a24-36e131ee3b7f.jpg)

#### Signs of the Problem:

1. Bugs for the same logic periodically appear;
1. Changes on one part break another part of the application.

Oh, that’s annoying. This is what breaks our authority and customers just turned back to us.

### Resurrect Automated Testing and Continuous Integration

Unit and small integration tests are probably the best things you can do for reducing regressions.
And all this should be cooked with [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html).

New changes should be covered by tests.

When someone discovers a bug in the software, adding an automated test that demonstrates it is mandatory.
Once the bug is fixed, rerun the test to ensure it passes.
This is the core of test-driven development, a time-honored methodology for maintaining quality in agile development.

Simplify adding tests by refactoring projects.
Some effective refactoring you could find on [Cleaning Up Your Rails Views With View Objects](http://www.jetthoughts.com/blog/tech/2014/08/14/cleaning-up-your-rails-views-with-view-objects.html).

**Out tools:** [CircleCI](https://circleci.com/) and [TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

### Verify New Changes

Authors of software need the same assistance as authors of novels to achieve the goals of the software organization.

[Code Review](https://www.atlassian.com/agile/code-reviews) is crucial and has been repeatedly shown to accelerate and streamline the process of software development like few other practices can.

With Code Review, we have a verification of new changes under isolated testing environment.
It will make verification way easier and you won't have the (maybe) broken code from other PRs on staging but only the code that requires testing.

As a result we kill several problems:

* Defect-free, readable and well-documented software;
* Sharing knowledge between developers.

**We found useful:** [Heroku Review App](https://devcenter.heroku.com/articles/github-integration-review-apps) and [GitHub](https://github.com/)

## Summary

![peaceful](https://cloud.githubusercontent.com/assets/125715/23949782/4b3e1ef2-0991-11e7-87ba-a538397f0cf9.jpg)

Described Practices are very simple and easy to integrate, but at the same time produce great results in short time, with long-term thinking.

Effective Development Pipeline makes healthy Engineering Teams.

Do not rest on this and integrate more Lean and Agile Practices.

Are you ready to move to the next stage? [Contact us](http://www.jetthoughts.com/contact.html) to find out more about other working practices.
We’re excited to help you – as always, we’d love to hear what you think!


See also:

* [Cleanup Your Rails Views](http://www.jetthoughts.com/blog/tech/2014/08/14/cleaning-up-your-rails-views-with-view-objects.html)
* [We have 11 from 12 by Joel Test](http://www.jetthoughts.com/blog/team/2016/02/08/how-jetthoughts-implements-joels-test.html)
* Atlassian’s Guide: [The Agile Coach](https://www.atlassian.com/agile)
* Google’s Posts: [Hackable Projects](https://testing.googleblog.com/2016/08/hackable-projects.html)
* Carbon Five’s Posts: [The 10 Practices of Healthy Engineering Teams](http://blog.carbonfive.com/2016/02/17/the-10-practices-of-healthy-engineering-teams-part-1/)

