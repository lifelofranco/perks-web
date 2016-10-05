class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :type
      t.string :street_address_1
      t.string :street_address_2
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :country
      t.string :phone_number
      t.string :website

      t.timestamps
    end
  end
end
