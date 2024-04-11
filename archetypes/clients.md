---
title: {{ replace .File.ContentBaseName "-" " " | title }}
excerpt: To take real estate communication to the next level, Agent Inbox hired us to build the right platform, deliver a market-ready solution, and help the team grow.
slug: {{ .File.ContentBaseName | urlize }}
author: Paul Keen
categories: ["Ruby on Rails", "Vue.js"]


metatags:
  image: og-clients-agent-inbox.jpg

client:
  logo: agent-inbox.png
  logo_white_version: agent-inbox_white.png
  name: Agent Inbox
  app_name: Agent Inbox
  website: https://www.example.com/
  industry: Real Estate
  locations: California, US
  timeline: 50+ Months
  cover_image: hero-ai.jpg


outcome:
  - name: From Zero to MVP
    value: 60 Days
  - name: Users Added in <1 Year
    value: 100,000+
  - name: Internal Developers Scaled Up
    value: 1 to 6


testimonial:
  name: CEO of Agent Inbox
  content: “With their help, we were able to quickly scale up into our market and land new clients… They also helped us raise millions of dollars in funding over multiple rounds for the project.”


gallery: ["ai-screen-2.png", "ai-screen-1.png", "ai-screen-3.png"]

date: {{ .Date }}
---
