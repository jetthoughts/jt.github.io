---
layout: post
title: Import Huge Data for Rails
date: 30-11-2010
author: Michael Nikitochkin
authors_git: miry
tags:
- rake
- rails
- csv
categories:
- blog
- database
excerpt: A simple rake task for dumping data from DB to CSV file. 
---

I wrote a simple rake task for dump data from DB to CSV file:

{% highlight ruby linenos=table %}
namespace :db do
  desc 'Create CSV fixtures from data'
  task :extract_to_csv => :environment do
    ActiveRecord::Base.establish_connection
    skip_tables = ["schema_info", "schema_migrations"]

    (ActiveRecord::Base.connection.tables - skip_tables).each do |table_name|
      FasterCSV.open("#{RAILS_ROOT}/db/fixtures/#{table_name}.csv", "w", :force_quotes => true) do |csv|
        model = table_name.classify.constantize
        csv << model.column_names
        model.all.each do |object|
          csv << model.column_names.map{|c| object.attributes[c]}
        end
      end
    end
  end
end
{% endhighlight %}

And import for Postgresql:

{% highlight bash linenos=table %}
copy import_products from '/home/miry/import_products.csv'
  with csv header NULL AS '' QUOTE  AS  '"';
{% endhighlight %}

