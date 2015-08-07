---
layout: post
author: Paul Nikitochkin
authors_git: pftg
title: Mock Everything Is a Good Way to Sink
date: 07-08-2015
tags:
- rails

categories:
- blog
- tech
---

<img src="http://www.quickmeme.com/img/9a/9a7460d0eec7baa6db72ab966714669e4754fea9ae127b44d6da56761260c2b2.jpg" class="left" style="margin-right: 2em;" />

Have you found a lot of code with mocks and stubs? But how do you feel about it?
When I see mocks/stubs, I am always looking for the way to remove them.
### Application lifecycle with mocking everything strategy:

1. Everything starts from a happy developer and a clean architecture with fastest tests. 
2. And one day in the middle of development we have changed the core application business logic. 
3. We have changed our code base according to new requirements, and now we expect to have failed tests .... oops, most of expected tests pass successfully instead of failing.

<!--cut-->

4. We found mocks in the code, updated them. 
5. And now we have a hunch, that tests are cheating on us, so we should find all similar mocks and update them to correspond the last requirements. 
6. And even after reviewing all tests, we still have considerable misgivings.

### What has just happened:

With mocks, we cannot rely on implemented architecture because using mocks/stubs we built a fake application from small chunks which are placed in different parts of test suites. As it turns out, changes to application architecture will not make our tests fail. So we should look for all our chunks and update them ourselves. And that's duplication, baby!

That said, Mocks and Stubs are powerful tools and should be put to a good use. Here are my principles when to use them:
* Stub/mock only the stuff that is impossible to setup/simulate like remote services responses, time and etc. 
* Stubs/Mocks only specifications, which will not be changed at all: external applications, libraries.

In other cases when I have a desire to mock something, then this is the first sign of a poor design. And I understand if I cannot add tests for simple application behaviour on initial stages, then how I will support it when it will become a whale of an application? Mocked behaviour is a sort of our technical debts which we should fix as soon as possible.

### Summary:

Do not overuse mocks and stubs ;) Most popular alternatives to mocks and stubs are fakes, which have some advantages of mocks, but are much easier to support. 

Here are some useful links about mocking\stubbing: 

 - https://www.youtube.com/watch?v=z9quxZsLcfo&feature=youtu.be&t=21m00s
 - http://martinfowler.com/articles/mocksArentStubs.html
 - http://www.thoughtworks.com/insights/blog/mockists-are-dead-long-live-classicists
 - https://gist.github.com/Integralist/7944948
 - https://www.youtube.com/watch?v=URSWYvyc42M

