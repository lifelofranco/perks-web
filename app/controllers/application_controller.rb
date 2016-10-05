# This is ApplicationController
class ApplicationController < ActionController::Base
  require 'edsa'
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_filter :validate_api_key,
  # if: Proc.new { |c| c.request.format == 'application/json' }
  force_ssl if: :ssl_configured?

  def not_found
    render status: 404, text: '404 Not Found'
  end

  # def validate_api_key
  #   unless ApiKey.validate(request.headers["X-Muber-API-Key"])
  #     not_found
  #   end
  # end

  def ssl_configured?
    !Rails.env.development?
  end
end
