module Api
  class PhilesController < ApplicationController
    def index
      @philes = User.find(params[:user_id]).philes
      render :index
    end

    def show
      @phile = Phile.find(params[:id])
      render :show
    end

    def create
      @phile = current_user.philes.new(phile_params)
      @phile.save!

      render json: @phile
    end

    def destroy
      @phile = Phile.find(params[:id])
      authorize! :destroy, @phile

      @phile.destroy!
      render json: @phile
    end

    private
    def phile_params
      params.require(:phile).permit(:name, :body)
    end
  end
end
