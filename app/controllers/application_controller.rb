class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :auth_token, :signup_error_messages, :current_user, :signed_in?

  def auth_token
    <<-HTML.html_safe
    <input type="hidden" name="authenticity_token"
      value="#{form_authenticity_token}">
    HTML
  end

  def signup_error_messages(messages)
    if messages
      <<-HTML.html_safe
      <strong>#{messages.join(" ")}</strong>
      HTML
    end
  end

  def sign_in!(user)
    session[:token] = user.session_token
  end

  def sign_out!
    if signed_in?
      current_user.reset_session_token!
      session[:token] = nil
    end
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def signed_in?
    !!current_user
  end

  def require_signed_out
    redirect_to user_url(current_user) if signed_in?
  end
end
