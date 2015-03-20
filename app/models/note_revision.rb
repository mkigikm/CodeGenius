class NoteRevision < ActiveRecord::Base
  validates :note, :author, :body, presence: true

  belongs_to :note
  belongs_to(
    :author,
    class_name: "User"
  )
end
