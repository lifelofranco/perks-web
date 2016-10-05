class CreateEmployeeDeals < ActiveRecord::Migration
  def change
    create_table :employee_deals do |t|
      t.integer :deal_id
      t.datetime :used_at
      t.datetime :redeemed_at

      t.timestamps
    end
  end
end
