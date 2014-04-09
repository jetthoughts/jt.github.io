---
layout: post
title: OpenSSL with Nginx and Untrusted CA
author: Michael Nikitochkin
authors_git: miry
date: 2009-10-23
tags:
- linux
- nginx
- ssl
- certificate
categories:
- blog
- tech

---

I was assigned a task: to set up <strong>ssl</strong> certificate for web application. We used  <strong>nginx</strong>, and found a free provider http://www.instantssl.com/ *COMODO*.

My coworker Sasha Lokshin helped to find a solution and provided key creation and provider signing algorithm. And he also gave the simplest documentation http://www.rapidssl.com/resources/csr/apache_mod_ssl.htm. The generation process passed on quickly. I have filled fields according to the suggested template. I have neither imputed secret phrases nor filled in any *extra* attributes.

{% highlight bash linenos=table %}
# openssl genrsa -out domain.com.key
Generating RSA private key, 2048 bit long modulus

# openssl req -new -key domain.com.key -out domain.com.csr
....
{% endhighlight %}

I have got two files. Now it was time to register with provider. It was easy too. We need to copy the  domain.com.csr file content and post it to the field.

<!--cut-->

{% highlight bash linenos=table %}
# cat domain.com.csr
{% endhighlight %}

After that, service sent an activation email to the domain admin email address and after the certificate activation I have received an archive with the description:

{% highlight bash linenos=table %}
* Root CA Certificate - AddTrustExternalCARoot.crt
* Intermediate CA Certificate - UTNAddTrustSGCCA.crt
* Intermediate CA Certificate - ComodoUTNSGCCA.crt
* Intermediate CA Certificate - EssentialSSLCA_2.crt
* Your Free SSL Certificate - domain_com.crt
{% endhighlight %}

I thought that my troubles were over. In accordance with nginx manual I have created a config for the application.

```
ssl    on;
ssl_certificate    /etc/ssl/private/domain_com.crt; (or .pem)
ssl_certificate_key    /etc/ssl/private/domain.com.key;
```

All is well. The app has loaded. Oh, snap! I loaded a page and got a mistake about the unknown certificate. After an hour of doing rain dance, I have found an article http://terra-firma-design.com/blog/20-Installing-an-EV-SSL-Certificate-on-Nginx, where the method of transferance of several certificates in one for nginx was described. That is not necessary for apache. A catalogue of certificate can be set up for apache.

```
# cat  AddTrustExternalCARoot.crt EssentialSSLCA_2.crt ComodoUTNSGCCA.crt UTNAddTrustSGCCA.crt domain_com.crt &gt;&gt; domain_com_new.crt
```

And I have corrected nginx config. After that I rebooted server and got an error.
<pre>Restarting nginx: [emerg]: invalid number of arguments in "ssl_certificate" directive in /opt/nginx/conf/production.conf:54</pre>

Then I found a forum, where the similar situation was discussed. One guy suggested checking the key and the received certificate. He told that Modulus fields should correspond as well.

{% highlight bash linenos=table %}
# openssl x509 -noout -text -in domain_com.crs
{% endhighlight %}

{% highlight bash linenos=table %}
RSA Public Key: (1024 bit)
Modulus (1024 bit):
  00:bb:e1:e7:7a:63:b8:eb:14:e4:44:93:11:1e:25:
  e4:52:07:5c:d1:33:5d:e2:84:88:4c:24:3a:bb:61:
  32:35:fe:51:02:73:fb:2e:09:86:9c:54:3f:dc:e0:
  11:d1:b7:4c:4f:a8:f9:fa:ab:e4:a7:a1:22:f5:43:
  b3:b6:a9:f4:84:4a:89:33:63:d3:3b:e5:9f:11:65:
  31:0a:84:0b:6e:b3:62:75:42:40:ac:17:cc:3e:9b:
  eb:46:04:25:3a:43:be:3c:73:57:04:8b:f0:f2:45:
  ad:4c:5c:f5:38:fb:66:bc:7f:b0:30:5e:ab:7d:73:
  af:1d:2c:a6:0f:01:5d:25:d9
{% endhighlight %}

{% highlight bash linenos=table %}
# openssl x509 -noout -text -in /opt/nginx/cert/domain_com.crt
{% endhighlight %}

{% highlight bash linenos=table %}
RSA Public Key: (2048 bit)
Modulus (2048 bit):
  00:b7:89:02:04:4e:4c:9b:cd:29:be:e9:3e:fa:74:
  44:6b:8e:bd:58:91:68:82:cb:3c:06:c9:2a:fe:19:
  95:b1:21:29:a0:94:94:5b:58:30:bb:bd:5b:d5:ca:
  79:4c:c2:d0:65:1e:d8:e8:2e:91:c6:5d:c0:55:49:
  d1:9d:a7:ec:38:d9:be:db:21:1a:59:b3:56:d7:6f:
  94:18:ec:65:38:35:82:9d:c5:80:f5:48:07:77:fc:
  07:4f:50:8e:df:a3:bf:07:49:2b:9a:91:be:c8:a5:
  b4:9e:1e:aa:b1:6d:c8:aa:ea:64:a3:da:13:27:7d:
  80:92:0e:41:de:3a:54:95:d4:75:24:2a:17:35:27:
  e2:00:10:d2:c0:22:24:e9:32:84:49:d4:eb:ba:f0:
  e3:de:ee:0d:90:e6:23:62:aa:51:6c:57:3f:46:00:
  5d:3c:35:64:24:f5:ab:ea:f7:21:22:91:46:48:e5:
  af:35:ea:03:bd:3b:fb:80:d7:38:cd:46:16:9a:34:
  ee:f4:96:24:2c:37:dc:27:87:3f:c2:b9:f9:d0:66:
  eb:90:c9:19:6b:87:c3:f7:f1:d0:c2:c6:68:a8:5a:
  71:e7:b8:79:6b:d0:c6:cd:88:0c:cf:d5:c4:67:0f:
  da:47:ad:6e:c1:72:5e:f2:30:64:2f:14:7c:4d:d5:
  5c:5d
{% endhighlight %}

I have found out that they are different. And that a provider signed the key with 2048 bit code. And I have 1024 by default. I decided to recompose the key, but setup 2048 bit.

```
# openssl genrsa -out domain_com.key 2048
# openssl req -new -key domain_com.key -out domain_com.csr
```

For half an hour I made an arrangement with a provider about replacing csr file and about issuing a new certificate. Checked the clean certificate and my key. Failed. Then I have united all certificates in one using the following method:

```
# cat  AddTrustExternalCARoot.crt EssentialSSLCA_2.crt ComodoUTNSGCCA.crt UTNAddTrustSGCCA.crt domain_com.crt &gt;&gt; domain_com_new.crt
```

When web server is loading, I get the same error as the last time. Then I decided to check the information of this certificate:

```
# openssl x509 -noout -text -in ssl-bundle.crt -modulus
```

It has issued only the first certificate from the list. Then I decided to slightly change the method of certificates merge, move my domain certificate higher and check the information:

```
# cat domain_com.crt AddTrustExternalCARoot.crt EssentialSSLCA_2.crt ComodoUTNSGCCA.crt UTNAddTrustSGCCA.crt &gt; domain_com_2.crt
# openssl x509 -noout -text -in ssl-bundle.crt -modulus
```

As anticipated, it issued information only about the necessary certificate. Reloaded web server and - wuala - it has loaded. Opened webpage - a certificate is displayed normally. No errors.
