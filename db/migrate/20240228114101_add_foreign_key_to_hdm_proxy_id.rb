class AddForeignKeyToHdmProxyId < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :hosts, :smart_proxies, column: :hdm_proxy_id, on_delete: :nullify
  end
end
