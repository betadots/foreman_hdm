module ProxyAPI
  class Hdm < Resource
    def initialize(args)
      @url = "#{args[:url]}/hdm/"
      super
    end

    def keys(host)
      get("/nodes/#{host.fqdn}/keys")
    end

    def key(host, key)
      get("/nodes/#{host.fqdn}/keys/#{key}")
    end
  end
end
