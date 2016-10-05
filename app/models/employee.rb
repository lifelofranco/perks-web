class Employee < ActiveRecord::Base
  belongs_to :company
  has_many :employee_deals
  has_many :deals, foreign_key: 'employee_id', class_name: 'EmployeeDeal'
end
