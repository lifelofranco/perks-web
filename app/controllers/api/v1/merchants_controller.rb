module Api
  module V1
    ### This is MerchantsController
    class MerchantsController < ApplicationController
      respond_to :json

      def index
        respond_with Merchant.all.order('created_at ASC')
      end

      def show
        respond_with Merchant.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      end

      def create
        @merchant = Merchant.new(merchant_params)
        respond_to do |format|
          format.json { render json: @merchant }
        end if @merchant.save
      end

      def update
        @merchant = Merchant.find(params[:id])
        respond_to do |format|
          format.json { render json: @merchant }
        end if @merchant.update(merchant_params)
      end

      def delete
        respond_with Merchant.destroy(params[:id])
      end

      def deals
        @merchant = Merchant.find(params[:id])
        @deals = @merchant.deals
        rescue ActiveRecord::RecordNotFound
          not_found
        else
          result = {
            merchant: @merchant,
            deals: @deals
          }
          respond_to do |format|
            format.json { render json: result }
          end
      end

      private

      def merchant_params
        params.require(:merchant).permit(:name,
                                         :description,
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
