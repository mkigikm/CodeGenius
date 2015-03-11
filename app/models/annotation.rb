class Annotation < ActiveRecord::Base
  validates :phile, :start, :finish, :author, :body, presence: true
  validates :start, numericality: {
    less_than: ->(annotation) { annotation.finish }
  }
  validates :start, numericality: {greater_than_or_equal_to: 0}
  validates :finish, numericality: {
    less_than: ->(annotation) { annotation.phile ? annotation.phile.length : 0 }
  }
  validate :annotations_cannot_overlap

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :annotations
  )

  belongs_to(
    :phile,
    class_name: "Phile",
    foreign_key: :phile_id,
    inverse_of: :annotations
  )

  def annotations_cannot_overlap
    overlap_query = <<-SQL
    NOT (finish < :start OR start > :finish)
    SQL

    overlaps = Annotation
      .where(phile_id: phile_id)
      .where(overlap_query, {start: start, finish: finish})
      .count

    errors.add(:start, "annotation cannot overlap") if overlaps > 0
  end
end
