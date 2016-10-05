# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140627030551) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_keys", force: true do |t|
    t.string   "name"
    t.string   "key"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "companies", force: true do |t|
    t.string   "name"
    t.string   "company_type"
    t.string   "street_address_1"
    t.string   "street_address_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "country"
    t.string   "phone_number"
    t.string   "website"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "deals", force: true do |t|
    t.integer  "merchant_id"
    t.string   "title"
    t.text     "description"
    t.datetime "expire_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "actual_value"
    t.decimal  "discounted_value"
    t.string   "category"
  end

  create_table "employee_deals", force: true do |t|
    t.integer  "deal_id"
    t.datetime "used_at"
    t.datetime "redeemed_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "employee_id"
  end

  create_table "employees", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "street_address_1"
    t.string   "street_address_2"
    t.string   "city"
    t.string   "country"
    t.string   "phone_number"
    t.string   "title"
    t.string   "department"
    t.string   "employee_id"
    t.integer  "company_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "zip_code"
    t.string   "state"
    t.integer  "dob_month"
    t.integer  "dob_day"
    t.integer  "dob_year"
    t.string   "email_address"
    t.integer  "salary_range"
  end

  create_table "merchants", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "street_address_1"
    t.string   "street_address_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "country"
    t.string   "phone_number"
    t.string   "website"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
