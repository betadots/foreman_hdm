module ForemanHdm
  class Engine < ::Rails::Engine
    isolate_namespace ForemanHdm
    engine_name 'foreman_hdm'
    # register_gettext

    config.autoload_paths += Dir["#{config.root}/app/controllers/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/helpers/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/models/concerns"]
    config.autoload_paths += Dir["#{config.root}/app/overrides"]

    # Add any db migrations
    initializer 'foreman_hdm.load_app_instance_data' do |app|
      ForemanHdm::Engine.paths['db/migrate'].existent.each do |path|
        app.config.paths['db/migrate'] << path
      end
    end

    initializer 'foreman_hdm.register_plugin', :before => :finisher_hook do |_app|
      Foreman::Plugin.register :foreman_hdm do
        requires_foreman '>= 3.4.0'

        # Add Global files for extending foreman-core components and routes
        register_global_js_file 'global'

        # Add permissions
        security_block :foreman_hdm do
          permission :view_foreman_hdm, { :'foreman_hdm/keys' => %i[index show] }
        end

        # Add a new role called 'Discovery' if it doesn't exist
        role 'ForemanHdm', [:view_foreman_hdm]

        smart_proxy_for Host, :hdm_proxy,
          feature: 'Hdm',
          label: N_('HDM Proxy'),
          description: N_('Smart proxy to access HDM'),
          api_description: N_('ID of HDM Proxy')
      end
    end

    rake_tasks do
      Rake::Task['db:seed'].enhance do
        ForemanHdm::Engine.load_seed
      end
    end
  end
end
