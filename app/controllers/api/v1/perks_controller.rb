module Api
  module V1
    class PerksController < ApplicationController

      def get_i18n
        options = {}.tap do |h|
          h[:locale] = (params[:locale] || 'en_US')
        end
        render :json => Perks.i18n(options)
      end
    end
  end
end
