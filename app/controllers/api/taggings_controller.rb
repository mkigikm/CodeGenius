class Api::TaggingsController < ApplicationController
  def create
    @phile = Phile.find(params[:phile_id])
    authorize! :tag, @phile

    tag_name = params[:tag]
    tag = Tag.find_by(name: tag_name) || Tag.create!(name: tag_name)
    @tagging = @phile.taggings.create!(tag: tag)

    render json: @tagging
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    authorize! :tag, @tagging.phile

    @tagging.destroy!
    render json: @tagging
  end
end
