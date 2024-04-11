---
title: "{{ replace .Name "-" " " | title }}"
description: 
slug: {{ .File.ContentBaseName | urlize }}
author: Paul Keen
date: {{ .Date }}
draft: false

metatags:
  image: og-privacy-policy.jpg

---