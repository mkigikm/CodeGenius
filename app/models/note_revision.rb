class NoteRevision < ActiveRecord::Base
  validates :note, :author, :body, presence: true

  default_scope { order("created_at DESC") }

  belongs_to :note
  
  belongs_to(
    :author,
    class_name: "User"
  )
end
