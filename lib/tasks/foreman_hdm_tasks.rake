require 'rake/testtask'

# Tasks
namespace :foreman_hdm do
  namespace :example do
    desc 'Example Task'
    task task: :environment do
      # Task goes here
    end
  end
end

# Tests
namespace :test do
  desc 'Test ForemanHdm'
  Rake::TestTask.new(:foreman_hdm) do |t|
    test_dir = File.expand_path('../../test', __dir__)
    t.libs << 'test'
    t.libs << test_dir
    t.pattern = "#{test_dir}/**/*_test.rb"
    t.verbose = true
    t.warning = false
  end
end

namespace :foreman_hdm do
  task :rubocop do
    begin
      require 'rubocop/rake_task'
      RuboCop::RakeTask.new(:rubocop_foreman_hdm) do |task|
        task.patterns = ["#{ForemanHdm::Engine.root}/app/**/*.rb",
                         "#{ForemanHdm::Engine.root}/lib/**/*.rb",
                         "#{ForemanHdm::Engine.root}/test/**/*.rb"]
      end
    rescue StandardError
      puts 'Rubocop not loaded.'
    end

    Rake::Task['rubocop_foreman_hdm'].invoke
  end
end

Rake::Task[:test].enhance ['test:foreman_hdm']

load 'tasks/jenkins.rake'
if Rake::Task.task_defined?(:'jenkins:unit')
  Rake::Task['jenkins:unit'].enhance ['test:foreman_hdm', 'foreman_hdm:rubocop']
end
