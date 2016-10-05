module Api
  module V1
    ### This is EmployeesController
    class EmployeesController < ApplicationController
      respond_to :json

      def index
        @employees = Employee.all.order('created_at ASC')
        respond_to do |format|
          format.json { render 'index' }
        end
      end

      def show
        @employee = Employee.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      else
        respond_to do |format|
          format.json { render 'show' }
        end
      end

      def create
        @employee = Employee.new(employee_params)
        respond_to do |format|
          format.json { render 'show' }
        end if @employee.save
      end

      def update
        @employee = Employee.find(params[:id])
        respond_to do |format|
          format.json { render 'show' }
        end if @employee.update(employee_params)
      end

      def delete
        @employee = Employee.destroy(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      else
        respond_to do |format|
          format.json { render 'show' }
        end
      end

      def company
        @employee = Employee.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      else
        @company = @employee.company
        respond_to do |format|
          format.json { render 'company' }
        end
      end

      def deals
        @employee = Employee.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      end

      private

      def employee_params
        params.require(:employee).permit(:company_id,
                                         :first_name,
                                         :last_name,
                                         :street_address_1,
                                         :street_address_2,
                                         :city,
                                         :state,
                                         :zip_code,
                                         :country,
                                         :phone_number,
                                         :title,
                                         :department,
                                         :employee_id,
                                         :dob_month,
                                         :dob_day,
                                         :dob_year,
                                         :email_address,
                                         :salary_range)
      end
    end
  end
end
