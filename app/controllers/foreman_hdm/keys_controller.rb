module ForemanHdm
  class KeysController < ::ApplicationController
    before_action :find_host

    def index
      render json: proxy.keys(@host)
    end

    def show
      render json: proxy.key(@host, params[:id])
    end

    private

    def proxy
      ::ProxyAPI::Hdm.new(url: @host.hdm_proxy.url)
    end

    def find_host
      @host = ::Host.friendly.find(params[:host_id])
    end
  end
end
