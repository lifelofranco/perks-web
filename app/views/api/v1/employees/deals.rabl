object @employee
extends 'api/v1/employees/show'

node(:total_redeemed_deals) { |employee| employee.deals.count }
node(:total_used_deals) { |employee| employee.deals.select { |d| d.used_at }.count }

total_used_deal_actual_value = @employee.deals.select { |d| d.used_at }.map{ |d| Deal.find(d.deal_id).actual_value }.inject{|sum, x| sum + x}
total_used_deal_discounted_value = @employee.deals.select { |d| d.used_at }.map{ |d| Deal.find(d.deal_id).discounted_value }.inject{|sum, x| sum + x}

node(:total_spent){ |employee| total_used_deal_discounted_value }
node(:total_savings){ |employee| ((total_used_deal_actual_value - total_used_deal_discounted_value) / total_used_deal_actual_value * 100.0).round(2).to_s + '%'}

child employee_deals: :deals do
  attribute :used_at, :redeemed_at
  child deal: :info do
    attributes :id, :title, :description, :category, :expire_at, :actual_value, :discounted_value
  end
end
