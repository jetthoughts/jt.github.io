module Jekyll
  class CategoriesGenerator < Generator
    DEFAULT_CATEGORY_TITLE_PREFIX = 'Category: '
    DEFAULT_CATEGORY_PAGE_DIR = '/'
    DEFAULT_CATEGORY_PAGE_LAYOUT = 'category'
    DEFAULT_CATEGORY_PAGINATE_PATH = '/page:num'
    DEFAULT_CATEGORY_PAGINATE = 25

    safe true

    attr_accessor :site;
    class << self;
      attr_accessor :site;
    end

    def generate(site)
      self.site = self.class.site = site
      generate_categories_pages(site)
    end

    def generate_categories_pages(site)
      site.categories.each do |category, posts|
        layout = config.category_page_layout
        posts = posts.sort.reverse!
        data = { 'layout' => layout, 'category' => category }
        pages = Pager.calculate_pages(posts, config.category_paginate)
        (1..pages).each do |num_page|
          dir = config.category_paged_dir_path(category, num_page, site)
          category_page = CategoryPage.new(site, site.source, dir, data)
          category_page.pager = Pager.new(site, num_page, posts, pages)
          site.pages << category_page
        end
      end
    end

    def config
      self.class
    end

    class << self
      def category_paged_dir_path(category, num_page, site)
        return nil if num_page.nil?
        category_base_dir = File.join(category_page_dir, category)
        return category_base_dir if num_page <= 1
        format = category_paginate_path
        format = format.sub(':num', num_page.to_s)
        File.join('', category_base_dir, format)
      end

      def category_title_prefix
        @category_title_prefix ||= site.config['category_title_prefix'] || DEFAULT_CATEGORY_TITLE_PREFIX
      end

      def category_page_dir
        @category_page_dir ||= site.config['category_page_dir'] || DEFAULT_CATEGORY_PAGE_DIR
      end

      def category_page_layout
        @category_page_layout ||= site.config['category_page_layout'] || DEFAULT_CATEGORY_PAGE_LAYOUT
      end

      def category_paginate_path
        @category_paginate_path ||= site.config['category_paginate_path'] || DEFAULT_CATEGORY_PAGINATE_PATH
      end

      def category_paginate
        @category_paginate ||= (site.config['paginate'] || DEFAULT_CATEGORY_PAGINATE).to_i
      end
    end
  end

  class CategoryPage < Page
    def initialize(site, base, dir, data = {})
      @site = site
      @base = base
      @dir = dir
      ext = site.layouts[data['layout']].ext
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), "#{data['layout']}#{ext}")
      self.data = data

      category_title_prefix = CategoriesGenerator.category_title_prefix
      self.data['title'] = "#{category_title_prefix} #{data['category'].capitalize}"
    end
  end

  module CategoryFilters
    def category_url(category, num_page = 1, site = CategoriesGenerator.site)
      CategoriesGenerator.category_paged_dir_path(category, num_page, site)
    end
  end
  Liquid::Template.register_filter(Jekyll::CategoryFilters)
end
