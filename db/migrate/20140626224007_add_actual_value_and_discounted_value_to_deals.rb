class AddActualValueAndDiscountedValueToDeals < ActiveRecord::Migration
  def change
    add_column :deals, :actual_value, :decimal
    add_column :deals, :discounted_value, :decimal
  end
end
