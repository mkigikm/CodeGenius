class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :auth_token

  def auth_token
    <<-HTML.html_safe
    <input type="hidden" name="authenticity_token"
      value="#{form_authenticity_token}">
    HTML
  end
end
