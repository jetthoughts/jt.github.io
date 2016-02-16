---
layout: post
author: Alexey Chernov
authors_git: EnragedWildkin
title: How to Setup a Project That Can Host Up to 1000 Users for Free
description: Looking for free services for your startup? Check our guide about resources that allow to host up to 1000 users free of charge.
date: 16-02-2016
tags:
- project

categories:
- blog
- tricks
---
<img src="https://cloud.githubusercontent.com/assets/5908100/13076073/6e9b7f34-d4b8-11e5-993e-33167c8d4ead.jpg" class="left" style="margin-right: 1em;" />

#### Basic Heroku Setup or Staging Configuration

 - Hosting service: [Heroku](https://www.heroku.com) 
 - Database: [PostgreSQL](http://www.postgresql.org)
 - Error-tracking: [Rollbar](https://rollbar.com)
 - Log aggregator: [Logentries](https://logentries.com)
 - Performance monitoring: [New Relic](http://newrelic.com)
 - Email testing: [Mailtrap](https://mailtrap.io)
 - Caching: [Memcached Cloud](https://redislabs.com/memcached-cloud)
 - Background Jobs: [Sidekiq](http://sidekiq.org)
 - Content Delivery Network: [CloudFront](https://aws.amazon.com/cloudfront) or [CloudFlare](https://www.cloudflare.com)
 - Image Hosting: [Cloudinary](http://cloudinary.com)
 

*TL;DR Fast, simple & cheap project setup for a start-up, that can handle up to thousand users.*

<!--cut-->

#### 0. Intro to the problem

Choosing Ruby on Rails (RoR) as a platform for your startup is a good choice for many reasons. One of them is a simplicity of a framework, and that's why a lot of start-up founders use RoR.

While developing an application, you may and will face some common problems. There are plenty of services, that can deal with them, saving your time and money. I've made a list of services & add-ons I suggest to use for building a working application prototype that can host up to 1k users.

Let's get started.

#### 1. Hosting platform

Using Platform as a Service (PaaS) makes sense because it encapsulates many tedious system administration functions and allows you to focus on your app by removing the need to maintain server infrastructure.

There are a lot of PaaS solutions for different needs and for different prices. You can check by yourself: <http://paasify.it>. In JT we have chosen to use Heroku - one of the best-known PaaS providers, especially in the Ruby community.

[Heroku](https://www.heroku.com) runs on top of [Amazon Web Services (AWS)](https://aws.amazon.com). Key benefits for me are:

- single command deployments;
- fully-managed database service;
- automatic load balancing;
- on-demand scaling.

With Heroku, you can get things running in 5 minutes in a simple fashion and as you scale or need more horsepower the process of resizing an instance or adding more instances is much simpler than a traditional cloud or dedicated server model.
Another benefit is add-ons, that provide solutions for nearly every need our application might have. These include databases, caching, logging, email/SMS, errors and exceptions, metrics, analytics and more. Many add-ons have free or low priced options and scale with your app.

As the most similar alternative, you can use [Ninefold](https://ninefold.com) or [OpenShift](https://www.openshift.com). They both provide free plans, and can run almost any database while Heroku uses [PostgreSQL](http://www.postgresql.org).

#### 2. Database

[Heroku Postgres](https://www.heroku.com/postgres) is recommended on Heroku because of its tight-integration with the platform and excellent management services and tools. It is a powerful database-as-a-service based on mature, feature-rich PostgreSQL database server. From Heroku blog post: "At Heroku, we believe PostgreSQL offers the best mix of powerful features, data integrity, speed, standards compliance, and open-source code of any SQL database on the planet".

Heroku Postgres offers a wide spectrum of plans appropriate for everything from small personal app to large-dataset applications. Plans are divided into 4 large tiers. The key factor in each tier is the uptime expectation and row limit. Free 'hobby-dev' plan offers 10K row limit and 4 hours downtime per month.

Since I recommended using Heroku, Postgres seems to be an obvious choice. However, there are options for applications currently running on MySQL. You can use ClearDB add-on, or run mysql locally, but convert to postgres when migrating to Heroku using the mysql2psql gem, but it can be really painful.
PG Backup helps to manage backups from Heroku Postgres database. It can periodically take backups automatically.

#### 3. Error-tracking
When an error occurs in our app, we want to know about this as soon as possible. Instead of putting an an error in logs and scanning it later, we can use an error-handling tool, which catches an error, saves it's backtrace context and sends an email with it to you.

[Rollbar](https://rollbar.com) is a great error-tracking service. It alerts us on exceptions and errors, provides analysis tools and dashboard, so we can see, reproduce and fix bugs quickly when something went wrong. This service has a possibility to log not only uncaught exceptions, but any messages. By default, the messages are reported synchronously, but you can enable asynchronous reporting using [Sidekiq](http://sidekiq.org), [girl_friday](https://github.com/mperham/girl_friday) or [Resque](https://github.com/resque/resque). Also, you can provide your own handler and a failover handler to be confident, that your error is tracked and delivered in the case of primary handler's fail.

The Rollbar's ancestor, [Airbrake](https://airbrake.io), is another good choice (if you can afford it, because it has no free plan). You can see a detailed comparison between these two here: <https://rollbar.com/vs/airbrake/>. Same applies to [Honeybadger](https://www.honeybadger.io) - one more popular modern error management service for rails. In a nutshell, they do similar things but may have different bells and whistles.

#### 4. Log aggregator

Logging is useful to explain the non-exceptional behaviour of the application. It provides an audit trail, that can be used to understand the activities of complex systems, to diagnose problems and to gather performance-relevant data.
[Logentries](https://logentries.com) is a powerful log-management tool. It offers a nice graphic representation of log data through web UI. It integrates with [New Relic](http://newrelic.com), providing combined search across both services. When Logentries throws an error, we can look at New Relic and see how badly it's affecting our application.

[Logentries](https://logentries.com) free plan is allowing 1-week storage with 33MB of log volume per day. As an alternative, I recommend taking a look at popular [Papertrail](https://papertrailapp.com), [Loggly](https://www.loggly.com), [FlyData](https://www.flydata.com/) or [Splunk](http://www.splunk.com).

#### 5. Performance monitoring

It's pretty obvious, why we should monitor application's performance. Application Performance Monitoring (APM) tools are helping us with that. I prefer using [New Relic](newrelic.com) and it has no significant alternatives for me. However, you can look at [AppSignal](https://appsignal.com), [Scout](https://scoutapp.com/plugin_urls/181-ruby-on-rails-monitoring), [Datadog](https://www.datadoghq.com).
New Relic is a solid monitoring solution, that helps to measure front-end and back-end performance, bottlenecks in database and customer satisfaction. It can be set up to ping application every 30 seconds to keep it alive.

#### 6. Email testing

It is unacceptable to bring a risk of accidently send dummy emails to the real customers. To test email notifications, I recommend using [Mailtrap](https://mailtrap.io).
Mailtrap is a dummy SMTP server for testing emails sent from development and staging environments. [Mailcatcher](mailcatcher.me) can be a replacement here.
If you are looking for service, that helps to ensure your emails reach customer inboxes, you should look at [Mailgun](https://www.mailgun.com), [Sendgrid](www.sendgrid.com) or [Mandrill](https://www.mandrill.com). All of them provide email deliverability expertise, and they have solid free plans, offering 10k emails per month.

#### 7. Caching

One of the most effective ways to improve application's performance is caching regularly accessed data.
There are two leading key-value stores: [Memcached](memcached.org) and [Redis](http://redis.io). I prefer using [Memcached Cloud](https://redislabs.com/memcached-cloud) add-on for caching, because it was originally intended for it and is easier to setup, and using Redis only for background jobs.

#### 8. Background jobs

It's hard to find a Rails app, that is not using background job processing. Background jobs help with handling computationally difficult tasks and long running requests.
Heroku has the ability to include not just a free web, but also one free worker, which can be used for background jobs, so there are no need of additional add-ons for it.

#### 9. CDN

Content Delivery Networks (CDN) are simple to use services that serve your website assets much faster than how your website hosting service can deliver them. CDNs are based on a large number of worldwide servers, or "edges". When visitors visit your website, they are automatically routed to the nearest edge location, so content is delivered with the best possible performance with a much-reduced latency. CDN allows offloading all requests for the static assets off of your web dynos, which in turn will free those dynos to handle more requests for dynamic content.

There are many CDN providers available today. Among of the most popular are [AWS CloudFront](https://aws.amazon.com/cloudfront) and [CloudFlare](https://www.cloudflare.com). Both are pretty cheap and provide relatively similar performance.
To see setup guide, visit <http://www.higherorderheroku.com/articles/cloudflare-dns-heroku/> or <https://devcenter.heroku.com/articles/using-amazon-cloudfront-cdn>.

#### 10. Image Uploading and Transforming 

When dealing with image processing, we can use [S3](https://aws.amazon.com/s3) and our own transformers, but in order to simplify development, better to use some free SaaS solution. We can rely on it when dealing with a common set of problems. Every image uploaded can be dynamically transformed to any thumbnail size, file format and quality so we are able to test different settings that best fit user expectations. All images can be automatically stripped and optimized in size and delivered from a CDN using correct cache settings.

I recommend using [Cloudinary](cloudinary.com) as an image management solution. Once uploaded to Cloudinary, images are stored on Cloudinary's Amazon S3 account. If you wish, you can automatically back your images to your own S3 as well.
As an alternative service, you can use [Blitline](https://www.blitline.com) for image processing.







