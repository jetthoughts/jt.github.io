---
layout: post
author: Michael Nikitochkin
authors_git: miry
title: Netcat with SSH Port Forwarding
date: 30-10-2012
categories:
- blog
- tricks

redirect_to:
- https://jtway.co/netcat-with-ssh-port-forwarding-148177b2e850
---

I have encountered a problem with getting access to the private local service which available from the local machine.
And I need to write application using this service in another network.
I have only one port open to access the local machine `ssh` daemon.
After a few minutes of problem discussion, we decided to use `NetCat`.

{% highlight bash linenos=table %}
mkfifo pipe
while [ 1 ]; do nc -l -p 8080 < pipe | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80" | tee pipe; done
{% endhighlight %}

So we need run this only on local machine. Now we have the open local port `8080` forwarded to private machine `192.168.12.230:80`.

Let me describe these commands

<!--cut-->

First open a local port to hear from our network connections. So this port will be proxy the data to private net:

{% highlight bash linenos=table %}
nc -l -p 8080
{% endhighlight %}

Next step is to connect is to login to private getaway host via `ssh` and open connection to local private host with ip `192.168.12.230` on port `80`:

{% highlight bash linenos=table %}
ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80"
{% endhighlight %}

So what we have. We can read data from local port to output and we can write data to remote host. Let's combine these commands:

{% highlight bash linenos=table %}
nc -l -p 8080 | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80"
{% endhighlight %}

After running this command we can send request to the local port `8080` and see a response from private host in the output.
It is not that we wanted, lets redirect the response to local connection. We use for this `pipe` or Unix sockets.

{% highlight bash linenos=table %}
mkfifo pipe; nc -l -p 8080 < pipe | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80" | tee pipe
{% endhighlight %}

Wow, that works, but after each request the connection gets closed. That's why we need to reconnect each time via simple loop.

{% highlight ruby linenos=table %}
mkfifo pipe
while [ 1 ]
do
  nc -l -p 8080 < pipe | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80" | tee pipe
done
{% endhighlight %}
