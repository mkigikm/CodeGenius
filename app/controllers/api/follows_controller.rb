module Api
  class FollowsController < ApplicationController
    def create
      @user = User.find(params[:user_id])
      current_user.follower_follows.create!(target: @user)
      render json: @user
    end

    def destroy
      @user = User.find(params[:user_id])
      @follow = current_user.follower_follows.find_by(target_id: params[:user_id])
      @follow.destroy!
      render json: @user
    end
  end
end
