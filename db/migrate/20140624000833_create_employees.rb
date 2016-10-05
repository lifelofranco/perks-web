class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :first_name
      t.string :last_name
      t.string :street_address_1
      t.string :street_address_2
      t.string :city
      t.string :country
      t.string :phone_number
      t.string :title
      t.string :department
      t.string :employee_id
      t.integer :company_id

      t.timestamps
    end
  end
end
