class FollowsController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    current_user.follower_follows.create!(target: @user)
    redirect_to request.referrer
  end

  def destroy
    @user = User.find(params[:user_id])
    @follow = current_user.follower_follows.find_by(target_id: params[:user_id])
    @follow.destroy!
    redirect_to request.referrer
  end
end
