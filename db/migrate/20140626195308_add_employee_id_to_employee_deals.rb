class AddEmployeeIdToEmployeeDeals < ActiveRecord::Migration
  def change
    add_column :employee_deals, :employee_id, :integer
  end
end
