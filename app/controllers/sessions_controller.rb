class SessionsController < ApplicationController
  before_action :require_signed_out, only: :new

  def new
    @user = User.new
    render :new
  end

  def create
    credentials = user_params
    @user = User.find_by_credentials(
      credentials[:email],
      credentials[:password]
    )

    if @user
      sign_in!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new(credentials)
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end