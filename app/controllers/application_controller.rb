class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

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
