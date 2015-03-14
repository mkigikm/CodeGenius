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

    def destroy
      @phile = Phile.find(params[:id])

      if @phile.owner == current_user
        @phile.destroy!
        render json: @phile
      else
        render json: "you don't have permission to delete this", status: 401
      end
    end

    private
    def phile_params
      params.require(:phile).permit(:name, :body)
    end
  end
end
