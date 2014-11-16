www.jetthoughts.com
=====================

Home site

#Setup

For those who have ruby installed, simply clone the project and run

```
bundle install
```

Then install tools for developing. Among them there is a task manager **gulp**, which is used for routine tasks and building assets.

*__Please note:__ you should have __Node.js__ installed in your system for this step*.

```
npm install
```

#Developing workflow

##Run site and tasks

When all gems and npm dependencies are installed just run the following command in terminal:

```
gulp
```

##Compressing images

For optimizing images we're using gulp task, but first of all place new images inside `source_images` directory and run:

```
gulp imagemin
```

This task will compress images and copy them to folder `images` which is used in production.

##Creating screenshots and testing changes on pages

For tracking visible changes on page we're using `gemini` module.
But before that you need to set an attribute `rootUrl` to `http://www.jetthoughts.com/` in `.gemini.yml` file.
Or you can download them into the folder `reports` (create it in the root of the project) - the link is in github wiki.

Before running screen gathering you need to run `PhantomJS` manually in a `WebDriver`

```
phantomjs --webdriver=4444
```

and run `jekyll`

```
jekyll serve
```

To create original screeshots run command:

```
gemini gather tests/gemini_tests/all_pages.js
```

it will create a folder `reports` with all screeshots of website pages.

After that you need to set an attribute `rootUrl` to `http://localhost:4000/` (your locallhost) in `.gemini.yml` file.
And run command:

```
gemini test tests/gemini_tests/all_pages.js --reporter html
```

it will create folder `gemini-report` with all report of your tests.

You can run tests only in console without creating report, to do that run command:

```
gemini test tests/gemini_tests/all_pages.js
```


#Content workflow

##Team page

###Add/edit new team mates info

Information about team members is stored inside `_data/team.yml`. It's structured as array of the objects, the first key is actually the name of the github nickname of the current user.
For adding or editing a new team mate simply edit information in that file in `yaml` syntax.

###Team page

For adding or moving team member view just dig in `team.html`. Inside it there are following wrappers for team members:

```
<div class="columns large-6 medium-6">
  {% include sections/team/team_mate.html team=site.data.team.miry %}
</div>
```

Where `team=site.data.team.miry` is the parameter sent to the included template. So the fraction `miry` means a team member's github name.
In that manner just copy-paste markup mentioned above and change parameter `team` with a proper key (github name of a new team mate).

If you want to move or arrange team mates inside a team page simply change ordering of the markup wrappers.

##Portfolio

###Add new

All portfolio items are located inside `_posts/portfolio/` dir and have __markdown__ format with some `yaml` data in the heading of the current file. Typical settings in `yaml` format for portfolio item look like this:

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

Each portfolio item requires two thumbs for better presentation. The sizes of thumbs are: __190x190__ and __570x270__ pixels.
Inside a portfolio item file set the value for `thumb` and `thumb_wide` as a path to both images, the squared and the wide ones.

####Slider

If you want to show the slider inside portfolio project simply assign array of the images path to `slider` key inside markdown portfolio item file.
For a better view prepare images for each slides with following dimensions: __770x480__ pixels.

###Arranging portfolio items

You can arrange portfolio items simply as [blog posts](#sorting-posts)

##Career

###Adding a new vacancy

Adding vacancies is as simple as writing [blog posts](#writting-a-new-post) with two differences:

  1. Place markdown files inside `_posts/career/` directory.

  2. Add summary of job position into `details` attribute at the top of the post and make it simple with only two columns like key and value:

```
details:
  Hire date: immediately
  Skills: fluent english, b2b selling
  Experience: over 10 years
```
This will generate a simple summary table inside a job position item.

####Vacancy layout

Set a proper layout value at the top of the post:

```
---
layout: career
title: "Managers! Where are you?"
```

##Blog

###Categories

All posts have to be have two categories.

  1. Type category – is for the global type (in this case `blog`) which represents its position inside the site structure, like a blog, career and portfolio.

  2. Content category – represents contextual category itself, like mobile, team, ruby etc.

This simple guideline allows to generate archive pages with list of all post in selected categories(tags) and make links for category into a post page.

###Writing a new post

Add new markdown file inside `_posts/blog/` directory with the following header data:

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

Where `authors_git` requires author's github name for the proper output for author's section at the compiled blog post.
Keep in mind [categoies](#categories) and remember to include `blog` category for the proper output.

###Sorting posts

By default all posts have date sorting. This means that you can set the date in the post file name, like this: `2014-04-17-how-to-learn-ruby.markdown` or you can change the date inside the post markdown file with an attribute `date` in UTC format `YYYY-MM-DD HH:MM:SS`.

##Publish changes

Just push a new commit to the master branch.
