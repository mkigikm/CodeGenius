module Api
  class NotesController < ApplicationController
    def update
      @note = Note.find(params[:id])

      if @note.update(note_params)
        render json: @note
      else
        render json: @note.errors.full_messages, status: :unprocessable_entity
      end
    end

    def create
      @note = current_user.notes.new(note_params)

      if @note.save
        render json: @note
      else
        render json: @note.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def note_params
      params.require(:note).permit(:body, :phile_id, :start, :finish)
    end
  end
end
