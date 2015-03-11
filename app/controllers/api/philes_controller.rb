module Api
  class PhilesController < ApplicationController
    def show
      @phile = Phile.find(params[:id])
      render :show
    end
  end
end
