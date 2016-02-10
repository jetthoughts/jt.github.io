source "https://rubygems.org"
ruby '2.1.2'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']

group :assets do
  gem 'jekyll', '>= 3.0'
  gem 'liquid'
  gem 'pygments.rb'
  gem 'fileutils'
  gem 'redcarpet'
  gem 'compass', '>= 0.12'
  gem 'rake'
  gem 'coffee-script'
  gem 'jekyll-asset-pipeline'
  gem 'oily_png'
  gem 'jekyll-sitemap', '>= 0.10.0'
  gem 'jekyll-paginate', '>= 1.1.0'
end

group :utils do
  gem 'foreman'
end

gem 'rack-contrib'
gem 'rack-cache'
gem 'dalli'
gem 'kgio'
gem 'puma'
