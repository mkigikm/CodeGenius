class HomePagesController < ApplicationController
  def index
    @philes = Phile.most_active
    render :index
  end
end
