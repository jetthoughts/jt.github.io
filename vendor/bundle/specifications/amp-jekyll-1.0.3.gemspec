# -*- encoding: utf-8 -*-
# stub: amp-jekyll 1.0.3 ruby lib

Gem::Specification.new do |s|
  s.name = "amp-jekyll".freeze
  s.version = "1.0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Juuso Mikkonen".freeze]
  s.date = "2019-11-08"
  s.description = "A Jekyll plugin to generate Accelerated Mobile Pages.".freeze
  s.email = ["hello@juusomikkonen.com".freeze]
  s.homepage = "https://github.com/juusaw/amp-jekyll".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0".freeze)
  s.rubygems_version = "3.0.8".freeze
  s.summary = "A Jekyll plugin to generate Accelerated Mobile Pages.".freeze

  s.installed_by_version = "3.0.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.0", "< 5.0"])
      s.add_runtime_dependency(%q<nokogiri>.freeze, [">= 1.6.0"])
      s.add_runtime_dependency(%q<fastimage>.freeze, [">= 1.8.0"])
    else
      s.add_dependency(%q<jekyll>.freeze, [">= 3.0", "< 5.0"])
      s.add_dependency(%q<nokogiri>.freeze, [">= 1.6.0"])
      s.add_dependency(%q<fastimage>.freeze, [">= 1.8.0"])
    end
  else
    s.add_dependency(%q<jekyll>.freeze, [">= 3.0", "< 5.0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 1.6.0"])
    s.add_dependency(%q<fastimage>.freeze, [">= 1.8.0"])
  end
end
