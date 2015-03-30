class SessionsController < ApplicationController
  before_action :require_signed_out, only: :new

  def new
    @user = User.new
    render :new
  end

  def guest
    @user = User.find_by(name: "guest")
    sign_in!(@user)
    redirect_to user_url(@user)
  end

  def create
    credentials = user_params
    @user = User.find_by_credentials(
      credentials[:name],
      credentials[:password]
    )

    if @user
      sign_in!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new(credentials)
      @error = "Incorrect name or password"
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end

  def omniauth
    @user = User.find_or_create_by_auth_hash(auth_hash)

    if @user
      sign_in!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new
      @error = "Sorry your twitter nickname has been taken"
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :password)
  end

  def auth_hash
    request.env["omniauth.auth"]
  end
end
