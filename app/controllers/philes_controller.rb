class PhilesController < ApplicationController
  def show
    @phile = find_phile
  end

  def create
    @phile = current_user.philes.new(phile_params)
    @phile.save!
    redirect_to user_url(current_user)
  end

  private
  def phile_params
    {}.tap do |phile|
      file_upload = params[:phile]
      if file_upload.is_a?(ActionDispatch::Http::UploadedFile)
        phile[:name] = file_upload.original_filename
        phile[:body] = file_upload.read
      end
    end
  end
end
