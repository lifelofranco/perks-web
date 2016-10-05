# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

companies = []
(1..10).each do |i|
  companies << {
    name: Faker::Company.name,
    company_type: ['Corporation', 'LLC'].sample,
    street_address_1: Faker::Address.street_address + ' ' + Faker::Address.street_suffix,
    street_address_2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    country: Faker::Address.country,
    zip_code: Faker::Address.zip_code,
    phone_number: Faker::PhoneNumber.phone_number,
    website: 'http://www.' + Faker::Internet.domain_name
  }
end

employees = []
(1..1000).each do |i|
  employees << {
    company_id: (1..10).to_a.sample,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    street_address_1: Faker::Address.street_address + ' ' + Faker::Address.street_suffix,
    street_address_2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    country: Faker::Address.country,
    zip_code: Faker::Address.zip_code,
    phone_number: Faker::PhoneNumber.phone_number,
    title: Faker::Name.title,
    department: ['Engineering', 'Sales', 'Legal', 'R&D', 'HR'].sample,
    employee_id: Faker::Number.number(6),
    dob_month: (1..12).to_a.sample,
    dob_day: (1..31).to_a.sample,
    dob_year: (1901..1996).to_a.sample,
    email_address: Faker::Internet.safe_email,
    salary_range: (1..15).to_a.sample
  }
end

merchants = []
(1..50).each do |i|
  merchants << {
    name: Faker::Company.name,
    description: Faker::Company.catch_phrase,
    street_address_1: Faker::Address.street_address + ' ' + Faker::Address.street_suffix,
    street_address_2: Faker::Address.secondary_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    country: Faker::Address.country,
    zip_code: Faker::Address.zip_code,
    phone_number: Faker::PhoneNumber.phone_number,
    website: 'http://www.' + Faker::Internet.domain_name
  }
end

deals = []
start_date = Time.now + 50.days
end_date = start_date + 365.days
(1..2000).each do |i|
  actual_value = (rand * (10000 - 100) + 100).round(2)
  discounted_value = (rand * (actual_value - 100) + 100).round(2)
  deals << {
    merchant_id: (1..50).to_a.sample,
    title: Faker::Lorem.sentence(word_count = 5),
    description: Faker::Lorem.sentence(word_count = 50),
    expire_at: start_date + (end_date - start_date) * rand,
    actual_value: actual_value,
    discounted_value: discounted_value,
    category: [ "Cellphones",
                "Dining",
                "Entertainment",
                "Fitness",
                "Shopping",
                "Spa and Massage",
                "Travel",
                "Utilities" ].sample
  }
end

Company.create(companies)
Employee.create(employees)
Merchant.create(merchants)
Deal.create(deals)

employee_deals = []
(1..15000).each do |i|
  deal_id = (1..2000).to_a.sample
  deal_expiration = Deal.find(deal_id).expire_at
  employee_deals << {
    deal_id: deal_id,
    employee_id: (1..1000).to_a.sample,
    used_at: [deal_expiration - (1..60).to_a.sample.days, nil].sample,
    redeemed_at: deal_expiration - (61..180).to_a.sample.days
  }
end

EmployeeDeal.create(employee_deals)
