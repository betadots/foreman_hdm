require File.expand_path('lib/foreman_hdm/version', __dir__)

Gem::Specification.new do |s|
  s.name        = 'foreman_hdm'
  s.version     = ForemanHdm::VERSION
  s.metadata    = { 'is_foreman_plugin' => 'true' }
  s.license     = 'GPL-3.0-only'
  s.authors     = ['betadots GmbH']
  s.email       = ['info@betadots.de']
  s.homepage    = 'https://github.com/betadots/foreman_hdm'
  s.summary     = 'Display hiera data in Foreman using HDM'
  s.description = 'Get hiera data from HDM and display alongside hosts in Foreman'

  s.files = Dir['{app,config,db,lib,locale,webpack}/**/*'] + ['LICENSE', 'Rakefile', 'README.md', 'package.json']
  s.test_files = Dir['test/**/*'] + Dir['webpack/**/__tests__/*.js']

  s.required_ruby_version = Gem::Requirement.new('>= 2.7')

  s.add_development_dependency 'rake', '~> 13.0', '>= 13.0.6'
  s.add_development_dependency 'rdoc', '~> 6.5'
  s.add_development_dependency 'rubocop', '~> 1.52', '>= 1.52.1'
  s.add_development_dependency 'rubocop-minitest', '~> 0.36.0'
  s.add_development_dependency 'rubocop-performance', '~> 1.18'
  s.add_development_dependency 'rubocop-rails', '~> 2.19', '>= 2.19.1'
  s.add_development_dependency 'rubocop-rake', '~> 0.6.0'
end
