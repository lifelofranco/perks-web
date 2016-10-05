object @employee
extends 'api/v1/employees/show'

child :company do
  extends 'api/v1/companies/show'
end
