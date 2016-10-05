module Api
  module V1
    ### This is Companies Controller
    class CompaniesController < ApplicationController
      respond_to :json

      def index
        @companies = Company.all.order('created_at ASC')
      end

      def show
        @company = Company.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      end

      def create
        @company = Company.create(company_params)
      end

      def update
        @company = Company.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      else
        @company.update(company_params)
      end

      def destroy
        @company = Company.destroy(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      end

      def employees
        @company = Company.find(params[:id])
        @employees = @company.employees
      rescue ActiveRecord::RecordNotFound
        not_found
      end

      private

      def company_params
        params.require(:company).permit(:name,
                                        :company_type,
                                        :street_address_1,
                                        :street_address_2,
                                        :city,
                                        :state,
                                        :zip_code,
                                        :country,
                                        :phone_number,
                                        :website)
      end
    end
  end
end
