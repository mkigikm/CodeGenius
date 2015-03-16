module Api
  class UsersController < ApplicationController
    def show
      @user = User.find(params[:id])
      render :show
    end

    def update
      @user = User.find(params[:id])
      authorize! :update, @user

      if @user.save
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end
  end
end
