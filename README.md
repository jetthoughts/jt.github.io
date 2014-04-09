www.jetthoughts.com
=====================

Home site

#Setup

For those who has ruby installed, simply clone project and run

```
bundle install
```

#Workflow

##Development branch

All work and development goes inside `development` branch. To checkout into this branch just run `git checkout development` inside project root directory.

*Every code changes has done inside of **master** would be overwritten by every [publishing](#publishing-changes) action.*

##Team page

###Add/edit new team mates info

Information about team members are stored inside `_data/team.yml`. It's structured as array of the objects, the first key is actually the name of the github nic of the current user.
For adding or editing new team mate simply edit information in that file in `yaml` syntax.

###Team page

For adding or move team member view just dig in `team.html`. Inside it there is following wrappers for team members:

```
<div class="columns large-6 medium-6">
  {% include sections/team/team_mate.html team=site.data.team.miry %}
</div>
```

Where `team=site.data.team.miry` is the parameter sent to included template. So the fraction `miry` means team member's github name.
In that manner just copy-paste markup mentioned above and change parameter `team` with proper key (github name of a new team mate).

If you want to move or arrange team mates inside team page simply change ordering of the markup wrappers.

##Portfolio

###Add new

All portfolio items is located inside `_posts/portfolio/` dir and has __markdown__ format with some `yaml` data in the heading of the current file. Typical settings in `yaml` format for portfolio item look like this:

```
---
layout: portfolio
title: "Greeting Pictures"
authors_git: tehhi42
project_url: itunes.apple.com/us/app/greeting-pictures/id542184989?ls=1&mt=8
thumb: "/images/portfolio/greeting/thumb.jpg"
thumb_wide: "/images/portfolio/greeting/thumb_wide.jpg"
excerpt: iPhone and iPad application, that helps to stay in touch with the friends and family using customizable postcards.

slider:
  [
    "/images/portfolio/greeting/slide_0.jpg",
    "/images/portfolio/greeting/slide_1.jpg",
    "/images/portfolio/greeting/slide_2.jpg"
  ]

categories:
  portfolio
  mobile

---
```

####Portfolio thumbs

Each portfolio item require two thumbs for better presentation. The sizes of thumbs are: __190x190__ and __570x270__ pixels.
Inside portfolio item file set the value for `thumb` and `thumb_wide` as path to both images, the squared and wide.

####Slider

If you want to show slider inside portfolio project simply assign array of the images path to `slider` key inside markdown portfolio item file.
For a better view prepare images for each slides with following dimensions: __770x480__ pixels.

###Arranging portfolio items

You can arrange portfolio items simply as [blog posts](#sorting-posts)

##Career

###Adding new vacancy

Adding vacancies as simple as writing [blog posts](#writting-a-new-post) with two differences:

  1. Place markdown files inside `_posts/career/` directory.

  2. Add summary of job position into `details` attribute at the top of the post and make it simple with only two columns like key and value:

```
details:
  Hire date: immediately
  Skills: fluent english, b2b selling
  Experience: over 10 years
```
This will generates simple summary table inside job position item.

####Vacany layout

Set proper layout value at the top of the post:

```
---
layout: career
title: "Managers! Where are you?"
```

##Blog

###Categories

All posts has to be have two categories.

  1. Type category – is for global type (in this case `blog`) which is represent its position inside the site structure, like a blog, career and portfolio.

  2. Content category – represent contextual category itself, like mobile, team, ruby etc.

This simple guideline allows to generate archive pages with list of all post in selected categories(tags) and make links for category into post page.

###Writing a new post

Add new markdown file inside `_posts/blog/` directory with following header data:

```
---
layout: post
title: "How to Learn Ruby"
author: Roman Skvirskiy
authors_git: rskvirskiy
date: 2014-04-17
tags: ruby
categories:
- blog
- team

---
```

Where `authors_git` require author's github name for proper output for author's section at compiled blog post.
Keep in mind [categoies](#categories) and remember to include `blog` category for proper output.

###Sorting posts

By default all posts has date sorting. This means that you can set date in post file name, like this: `2014-04-17-how-to-learn-ruby.markdown` or you can override the date inside post markdown file with attribute `date` in UTC format `YYYY-MM-DD HH:MM:SS`.

##Publishing changes

For publishing a new changes that was done on `development` branch just run following command:
```
rake publish
```