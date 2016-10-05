module Api
  module V1
    ### This is DealsController
    class DealsController < ApplicationController
      respond_to :json

      def index
        respond_with Deal.all.order('created_at ASC')
      end

      def show
        respond_with Deal.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        not_found
      end

      def create
        @deal = Deal.new(deal_params)
        respond_to do |format|
          format.json { render json: @deal }
        end if @deal.save
      end

      def update
        @deal = Deal.find(params[:id])
        respond_to do |format|
          format.json { render json: @deal }
        end if @deal.update(deal_params)
      end

      def delete
        respond_with Deal.destroy(params[:id])
      end

      private

      def deal_params
        params.require(:deal).permit(:merchant_id,
                                     :title,
                                     :description,
                                     :expire_at)
      end
    end
  end
end
