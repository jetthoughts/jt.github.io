---
layout: post
author: Michael Nikitochkin
title: Netcat with SSH port forwarding
date: 30-10-2012
---

Met with trouble to get access to the private local service which available from the local machine.
And I need to write application using this service in another network.
I have only one port open to access to the local machine `ssh` daemon.
After a few minutes of problem  discussion, we decided to use `NetCat`.

```
    mkfifo pipe
    while [ 1 ]; do nc -l -p 8080 < pipe | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80" | tee pipe; done
```

So we need run this only on local machine, and now we have the open local port `8080` forwarded to private machine `192.168.12.230:80`.

Let me to describe these commands

First open a local port to listen from our network connections. So this port will be proxy the data to private net:

```
    nc -l -p 8080
```

Next step is to connect is login to private getway host via `ssh` and open connection to local private host with ip `192.168.12.230` on port `80`:

```
    ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80"
```

So what we have. We can read data from local port to output and we can write data to remote host. Lets combine these commands:

```
    nc -l -p 8080 | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80"
```

After run this command we can send request to the local port `8080` and see in the output a response from private host.
It is not that we wanted, lets redirect the response to local connection. We use for this `pipe` or Unix sockets.

```
    mkfifo pipe; nc -l -p 8080 < pipe | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80" | tee pipe
```

Wow it is work, but after each request the connection get closed. That's why we need to reconnect each time via simple loop.

```
    mkfifo pipe
    while [ 1 ]
    do
      nc -l -p 8080 < pipe | ssh gw_to_private_net -p 22977  "nc 192.168.12.230 80" | tee pipe
    done
```
