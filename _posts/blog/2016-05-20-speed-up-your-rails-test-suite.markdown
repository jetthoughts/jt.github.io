---
layout: post
author: Hnat Kubov
authors_git: hnatt
title: Speed Up Your Rails Test Suite By 6% In 1 Line
date: 2016-05-20
tags:
- rails
- ruby
- tdd

categories:
- blog
- tricks
---

<img class="left" style="margin-right: 1em;" src="https://cloud.githubusercontent.com/assets/781760/15439823/c735cf52-1eda-11e6-85b3-0cb47a86fbb7.jpg" alt="caber toss" />

At one project we have a set of currently 3k+ tests, running more than 2
minutes. Most of the test cases rely on the DB, and ActiveRecord logs all
queries by default. The test.log grows by around 20M per suite run.

Once again deleting an overgrown local log file, I thought that we don't really
need it and logging in a test mode should be better disabled by default.

<!--cut-->

## Measurement of success

And I also decided to benchmark the tests to measure a potential gain in speed.

Turned out, there was. I created a branch with disabled logging in the test
environment and ran the test suite 40 times, switching between branches each
time. It was decided to do so instead of running test series for each branch
separately, so that other tasks my PC was performing, did not affect only one batch of the
results. I also left the PC running alone so that every run received about the
same amount of resources.

My batch test script was like this:

```
for i in {1..20}; \
  git checkout disable-test-log; \
  { time -p rake test &>/dev/null ; } 2>&1 | grep real | sed 's/real //' >> test_runs_nologs; \
  git checkout master; \
  { time -p rake test &>/dev/null ; } 2>&1 | grep real | sed 's/real //' >> test_runs_default; \
done
```

I used Bash `time` command to get the total execution time instead of the time
shown by the test suite itself because the test suite always shows lesser time
than the test really takes.

One and a half hours later I had the results. For the default branch the mean
time was 125.6s with a standard error of 0.26, and for the branch with logs
disabled it was 116.9 with SE of 0.34. So the gain in speed was 8.7s or 6.93%.

This seemed like too much, so I decided the reason was that I ran my tests on
an HDD which is, of course, obsolete and inferior technology. So I cloned the
repository to an SSD and repeated the experiment.

Surprisingly, the results were very similar to those from HDD: 120.07s with
logs with 0.19 SE, 112.46s without logs with 0.53 SE. Or 6.34% speed gain from
the default value.

And since I was already cloning the repo around, I also cloned it to a tmpfs
partition, which is a file system residing in RAM (or swap file, but in my case
only RAM). The results were slightly different but still in favor of disabled
logs: 118.92s (0.21 SE), 115.13s (1.98 SE) or 3.18% gain.

So roughly half of the gained time was spent on disk latency and the other
half on the logging logic.


## How to disable logging in test environment 

There's not much documentation on how you can disable logging completely, so I
had to experiment, and the only thing I came up with is adding this to
`config/environments/test.rb`:

```
config.logger = Logger.new(nil)
config.log_level = :fatal
```

Apparently if you write `config.logger = nil` it's the same as not write
anything at all because the default logger gets created. So I created a Logger
which logs to nothing. I also have set the highest error level so that it
didn't even try to log anything but FATAL messages.

There are some cases when you might need the test log. So to avoid editing the
environment configuration, you can add an environment variable flag that will
enable the logging:

```
unless ENV['RAILS_ENABLE_TEST_LOG']
  config.logger = Logger.new(nil)
  config.log_level = :fatal
end
```

And then to run the tests with logging enabled, you execute command:

```
$ RAILS_ENABLE_TEST_LOG=1 rake test 
```
