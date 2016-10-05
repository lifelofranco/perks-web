object @company
extends 'api/v1/companies/show'

child :employees do
  attributes :id,
             :employee_id,
             :first_name,
             :last_name,
             :title,
             :department,
             :street_address_1,
             :street_address_2,
             :city,
             :state,
             :zip_code,
             :country,
             :phone_number
end
