class NotesController < ApplicationController
  def show
    @note = Note.find(params[:id])
    render :show
  end
end
