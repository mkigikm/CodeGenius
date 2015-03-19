module Api
  class PhilesController < ApplicationController
    def index
      tag, prefix = parse_query(params[:query])

      @philes = User
        .find(params[:user_id])
        .philes
        .where("philes.name LIKE ?", "#{prefix}%")

      if tag
        @philes = @philes
          .joins(:tags)
          .where("tags.name = ?", tag)
      end

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

    def parse_query(query)
      tag, prefix = query.match(/^(tag:[^ ]+)?(.*)/)[1..-1]
      [tag.try(:slice, 4..-1), prefix.strip]
    end
  end
end
