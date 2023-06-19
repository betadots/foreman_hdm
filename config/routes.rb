ForemanHdm::Engine.routes.draw do
  constraints(id: %r{[^/]+}, host_id: %r{[^/]+}) do
    resources :hosts, only: [], controller: '/hosts' do
      resources :keys, only: %i[index show]
    end
  end
end

Foreman::Application.routes.draw do
  mount ForemanHdm::Engine, at: '/foreman_hdm'
end
