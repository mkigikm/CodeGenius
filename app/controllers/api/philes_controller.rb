module Api
  class PhilesController < ApplicationController
    def show
      @phile = Phile.find(params[:id])
      render :show
    end

    def create
      @phile = current_user.philes.new(phile_params)
      @phile.save!
      render json: @phile
    end

    private
    def phile_params
      params.require(:phile).permit(:name, :body)
    end
  end
end
