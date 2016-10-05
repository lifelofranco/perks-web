module Api
  module V1
    ### This is MetricsController
    class MetricsController < ApplicationController
      before_filter :validate_auth
      def metrics
        result = Edsa.get_metrics(params[:metric_name], params[:args])
        respond_to do |format|
          format.json { render json: result }
        end
      end

      private

      def validate_auth
        token = JSON.parse(MuberAuth.delegation({
          client_id: AUTH0_CONFIG['client_id'],
          id_token: request.headers['Authorization'].gsub('Bearer ', ''),
          target: AUTH0_CONFIG['api_id'],
        }))["id_token"]
        secret = AUTH0_CONFIG['api_secret']
        decoded_token = JWT.decode(token, Base64.decode64(secret.gsub('-', '+').gsub('_','/')))

        if decoded_token[0]["aud"] !=  AUTH0_CONFIG['api_id']
          render status: 401, text: '401 Unauthorized'
        end
      end
    end
  end
end
