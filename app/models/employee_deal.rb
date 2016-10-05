class EmployeeDeal < ActiveRecord::Base
  belongs_to :employee
  belongs_to :deal
end
