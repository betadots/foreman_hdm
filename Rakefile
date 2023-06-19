#!/usr/bin/env rake
begin
  require 'bundler/setup'
rescue LoadError
  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
end
begin
  require 'rdoc/task'
rescue LoadError
  require 'rdoc/rdoc'
  require 'rake/rdoctask'
  RDoc::Task = Rake::RDocTask
end

RDoc::Task.new(:rdoc) do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title    = 'ForemanHdm'
  rdoc.options << '--line-numbers'
  rdoc.rdoc_files.include('README.rdoc')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

APP_RAKEFILE = File.expand_path('test/dummy/Rakefile', __dir__)

Bundler::GemHelper.install_tasks

require 'rake/testtask'

Rake::TestTask.new(:test) do |t|
  t.libs << 'lib'
  t.libs << 'test'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = false
end

task default: :test

begin
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new
rescue StandardError => _e
  puts 'Rubocop not loaded.'
end

task :default do
  Rake::Task['rubocop'].execute
end

begin
  require 'github_changelog_generator/task'
rescue LoadError
  # github_changelog_generator is an optional group
else
  GitHubChangelogGenerator::RakeTask.new :changelog do |config|
    version = ForemanHdm::VERSION
    config.future_release = "v#{version}" if /^\d+\.\d+.\d+$/.match?(version)
    config.header = "# Changelog\n\nAll notable changes to this project will be documented in this file."
    config.exclude_labels = %w[duplicate question invalid wontfix wont-fix skip-changelog]
    config.user = 'betadots'
    config.project = 'foreman_hdm'
  end
end
