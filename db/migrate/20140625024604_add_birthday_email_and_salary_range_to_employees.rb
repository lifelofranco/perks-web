class AddBirthdayEmailAndSalaryRangeToEmployees < ActiveRecord::Migration
  def change
    add_column :employees, :dob_month, :integer
    add_column :employees, :dob_day, :integer
    add_column :employees, :dob_year, :integer
    add_column :employees, :email_address, :string
    add_column :employees, :salary_range, :integer
  end
end
