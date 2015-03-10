class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :auth_token, :error_messages

  def auth_token
    <<-HTML.html_safe
    <input type="hidden" name="authenticity_token"
      value="#{form_authenticity_token}">
    HTML
  end

  def error_messages(model, key)
    if model.errors.keys.include?(key)
      <<-HTML.html_safe
      <strong>#{model.errors.full_messages_for(key).join(" ")}</strong>
      HTML
    end
  end

  def sign_in!(user)

end
