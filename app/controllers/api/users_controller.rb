module Api
  class UsersController < ApplicationController
    def show
      @user = User.find(params[:id])
      render :show
    end

    def update
      @user = User.find(params[:id])
      authorize! :update, @user

      if !@user.is_password?(old_password)
        render json: ["old password doesn't match"],
            status: :unprocessable_entity
        return
      end

      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def user_params
      strong_params = [:avatar, :email]
      strong_params.concat([:password, :password_confirmation]) if old_password

      params.require(:user).permit(*strong_params)
    end

    def old_password
      params[:user] && params[:user][:old_password]
    end
  end
end
