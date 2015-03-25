class HomePagesController < ApplicationController
  def index
    @philes = Phile.all.order("created_at DESC").limit(20)
    render :index
  end
end
