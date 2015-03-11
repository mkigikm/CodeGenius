class Note < ActiveRecord::Base
  validates :phile, :start, :finish, :author, :body, presence: true
  validates :start, numericality: {
    less_than: ->(note) { note.finish }
  }
  validates :start, numericality: {greater_than_or_equal_to: 0}
  validates :finish, numericality: {
    less_than: ->(note) { note.phile ? note.phile.length : 0 }
  }
  validate :notes_cannot_overlap

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :notes
  )

  belongs_to(
    :phile,
    class_name: "Phile",
    foreign_key: :phile_id,
    inverse_of: :notes
  )

  def notes_cannot_overlap
    overlap_query = <<-SQL
    NOT (finish < :start OR start > :finish)
    SQL

    overlaps = Note
      .where(phile_id: phile_id)
      .where(overlap_query, {start: start, finish: finish})
      .count

    errors.add(:start, "notes cannot overlap") if overlaps > 0
  end
end
