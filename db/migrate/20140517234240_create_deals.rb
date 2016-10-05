class CreateDeals < ActiveRecord::Migration
  def change
    create_table :deals do |t|
      t.integer :merchant_id
      t.string :title
      t.text :description
      t.datetime :expire_at

      t.timestamps
    end
  end
end
