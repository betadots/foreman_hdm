module ProxyAPI
  class Hdm < Resource
    def initialize(args)
      @url = "#{args[:url]}/hdm/"
      super
    end

    def keys(host)
      hostname, environment = get_hostname_and_environment(host)

      get("/environments/#{environment}/nodes/#{hostname}/keys")
    end

    def key(host, key)
      hostname, environment = get_hostname_and_environment(host)

      get("/environments/#{environment}/nodes/#{hostname}/keys/#{key}")
    end

    private

    def get_hostname_and_environment(host)
      [host.fqdn, host.environment.name]
    end
  end
end
