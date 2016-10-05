object @company
attributes :id,
           :company_type,
           :name,
           :street_address_1,
           :street_address_2,
           :city,
           :state,
           :zip_code,
           :country,
           :phone_number,
           :website
node(:number_of_employees) { |company| company.employees.count }
