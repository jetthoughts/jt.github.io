---
layout: post
author: Michael Nikitochkin
authors_git: miry
title: Visualization of Your Code
date: 04-21-2014
tags:
- rails

categories:
- blog
- tech
---

<img src="https://cloud.githubusercontent.com/assets/5908100/7250573/4be4477e-e82c-11e4-8c1a-24204d856290.jpg" class="left" style="margin-right: 1em;" />
Working at long and big projects, it is fun to see on a release date how this project was built: who worked at a particular part; when a new guy joined the project,  deleted some code and did refactoring; or when the lead developer went to vacation. There is a lot of such tools, you can even use a browser version. But I still prefer using `gource`.

This story would be about how to setup and automize video creation, what general issues you will encounter and other stuff.

<!--cut-->

# Gource

It is an old tool. I started using it in 2009 when we finished the next sprint. https://github.com/acaudwell/Gource

## Step 1: Installation

Ok, you wouldn't believe me, but I use ... use ... *MacOS* :)

![PowerPC](http://www.applegazette.com/wp-content/uploads/2007/08/emac.jpg)

```
$ brew update
$ brew install gource
```

That's all.

## Step 2: Show simple video

Now you are able to see visualization of any project of yours.

```
$ cd <path to project>
$ gource
```

## Step 3: Avatars

Ok, now you see some color dots and color figures. Let's add some recognizable images to authors. There is an old example showing how to get gravatars of users: 

```
$ curl https://gist.githubusercontent.com/miry/dbf01f5a198060710255/raw/d07db1571a045e057e6d56444943bc798dd91be3/authors_gravatar.pl > authors_gravatar.pl
```

Run the script `authors_gravatar.pl` and it would fetch gravatar images by author's email to `.git/avatar`.

```
$ perl authors_gravatar.pl
$ gource --user-image-dir .git/avatar
```

## Step 4: Video

First read this article [Gource Videos](https://code.google.com/p/gource/wiki/Videos#Linux_/_Mac)

```
$ gource --camera-mode overview --seconds-per-day 1 --user-image-dir .git/avatar/ -1280x720 -o gource/gource.ppm 

$ ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i gource/gource.ppm -vcodec libx264 -preset ultrafast -pix_fmt yuv420p -crf 1 -threads 4 -bf 0 gource/gource.mp4
```

## Step 5: Soundtrack

Open video file in QuickTime. From Finder Drag and Drop our soundtrack file to the QuickTime window. It is very easy.

![QuickTime](http://cl.ly/image/3N2K3V2B2436/QuickTime%20Video%20%2B%20Soundtrack.png)
