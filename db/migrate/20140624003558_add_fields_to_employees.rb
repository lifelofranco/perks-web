class AddFieldsToEmployees < ActiveRecord::Migration
  def change
    add_column :employees, :zip_code, :string
    add_column :employees, :state, :string
  end
end
