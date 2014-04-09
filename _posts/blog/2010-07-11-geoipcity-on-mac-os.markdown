---
layout: post
title: Geoip_city on Mac OS
date: 11-07-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- geoip
- ruby
- gem
categories:
- blog
- tech

---

Today I spent a lot of time installing gem *geoip_city*. So what have I done:

* Get latest version of GeoIP C Api from <http://geolite.maxmind.com/download/geoip/api/c/>

{% highlight bash linenos=table %}
wget http://geolite.maxmind.com/download/geoip/api/c/GeoIP-1.4.6.tar.gz
tar zxf GeoIP-1.4.6.tar.gz
cd GeoIP-1.4.6
{% endhighlight %}

<!--cut-->

* Read file *README.OSX*. Found simple instructions to compile this lib.

{% highlight bash linenos=table %}
export GEOIP_ARCH='-arch i386 -arch x86_64 -arch ppc -arch ppc64'
export MACOSX_DEPLOYMENT_TARGET=10.4
export LDFLAGS=$GEOIP_ARCH
export CFLAGS="-mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.4u.sdk $GEOIP_ARCH"
./configure --disable-dependency-tracking
perl -i.bak -pe'/^archive_cmds=/ and !/\bGEOIP_ARCH\b/ and s/-dynamiclib\b/-dynamiclib \\\$(GEOIP_ARCH)/' ./libtool
make
{% endhighlight %}

* When I have run all this stuff, I did not get a successful result, I still had an error when installing a gem.

* Showed available SDKs in the host
 ` ls /Developer/SDKs `
 I got two: MacOSX10.5.sdk     MacOSX10.6.sdk

* So I have changed a line in readme file
before

{% highlight bash linenos=table %}
export CFLAGS="-mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.4u.sdk $GEOIP_ARCH"
{% endhighlight %}

to

{% highlight bash linenos=table %}
export CFLAGS="-mmacosx-version-min=10.4 -isysroot /Developer/SDKs/MacOSX10.6.sdk $GEOIP_ARCH"
{% endhighlight %}

* and executed all steps from README file.

* but found a problem in step configure:

{% highlight bash linenos=table %}
% ./configure --disable-dependency-tracking
checking for gcc... gcc
checking for C compiler default output file name...
configure: error: C compiler cannot create executables
See `config.log' for more details.
{% endhighlight %}

* I chose another SDK and set to "MacOSX10.5.sdk"

* repeated all steps once again

* then install gem and all works fine

If you have troubles installing a gem and still see the next message:

{% highlight bash linenos=table %}
checking for GeoIP_record_by_ipnum() in -lGeoIP... no
you must have geoip c library installed!
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of
necessary libraries and/or headers.  Check the mkmf.log file for more
details.  You may need configuration options.

Provided configuration options:
  --with-opt-dir
  --without-opt-dir
  --with-opt-include
  --without-opt-include=${opt-dir}/include
  --with-opt-lib
  --without-opt-lib=${opt-dir}/lib
  --with-make-prog
  --without-make-prog
  --srcdir=.
  --curdir
  --ruby=/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby
  --with-geoip-dir
  --without-geoip-dir
  --with-geoip-include
  --without-geoip-include=${geoip-dir}/include
  --with-geoip-lib
  --without-geoip-lib=${geoip-dir}/lib
  --with-GeoIPlib
  --without-GeoIPlib
{% endhighlight %}

Then you should add include /usr/local/lib to DYNLD_LIBRARY_PATH. Or do the folllowing:
in step of configuration do  `./configure --disable-dependency-tracking  --prefix=/opt/GeoIP`
and then the next steps from README. I suggest do `make clean` before each of compiles.
And then `sudo gem install geoip_city -- --with-geoip-dir=/opt/GeoIP` to install gem.
