class Company < ActiveRecord::Base
  has_many :employees
  has_many :employee_deals, through: :employees
end
