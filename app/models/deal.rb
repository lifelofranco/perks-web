class Deal < ActiveRecord::Base
  belongs_to :merchant
  has_many :employee_deals
end
