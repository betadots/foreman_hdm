class AddHdmProxyIdToHosts < ActiveRecord::Migration[6.1]
  def change
    add_column :hosts, :hdm_proxy_id, :integer
  end
end
