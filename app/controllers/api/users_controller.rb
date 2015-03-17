module Api
  class UsersController < ApplicationController
    def show
      @user = User.find(params[:id])
      render :show
    end

    def update
      @user = User.find(params[:id])
      authorize! :update, @user

      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def user_params
      params.require(:user).permit(:avatar, :email, :password,
          :password_confirmation)
    end
  end
end
