# Install

1. Change config.toml file acording to your settings
2. Change Google forms

## About

This is ported version of beaver builder wordpress website, that's why it has different css, js for every page.

Requirement was to port design exactly as is and I'm not very good at css, so here we go. That's why it has qudrillion of files from wordpress. Some of them are not needed.
After moving to more sane theme hopefully they will be deleted.

## Google forms

In `config.toml` change google forms input names and action

## Google Forms Notification

You need to install and configure addon
<https://www.youtube.com/watch?v=FvZ2tM0m7AY>

## Pages

In this theme there 3 different types

1. Simple page type (privacy policy)
2. Custom page layout for `/clients/`, `/use-cases/`, `/carreers/`, `/services/` homepage, about.
3. Custom page types for single client, use-case, career, service.

## Data

`companies` are get from `data/companies.yaml` file
Technologies could be taken from `data/technologies.yaml` but beaver wordpress has custom layout (probably manullay created), so you can't just dump them as is because design will be different. After moving to sane theme feel free to use `data/technologies.yaml` for it. Look how companies are used and make similar.

## Adding new client/career/page/services

### Method 1

Go to `content/clients` and copy folder then rename it and change content and images accordingly

### Method 2

Using cli `hugo new content clients/new-client/index.md`

#### Note from developer

Beaver builder and nitro created a lot of css and js files. Also, it created css in the page, js in the page and every page has different css, js files. That's why I'm using awkward if else in header partial, footer partial instead of using baseof (don't want to complicate the code more, so custom css js will be in header and footer instead of adding them in each page layout).
