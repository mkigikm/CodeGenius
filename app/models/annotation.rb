class Annotation < ActiveRecord::Base
  validates :phile, :start, :finish, :author, :body, null: false
  validate :annotations_cannot_overlap, :start_before_end

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id
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
    NOT (annotation.finish < :start OR annotation.start > :finish
    SQL

    overlaps = Annotations.where(phile_id: phile)
      .where(overlap_query, {start: start, finish: finish}).count

    errors.add(:start, "annotation cannot overlap") if overlaps > 0
  end

  def start_before_end
    errors.add(:start, "must come before end") if start >= finish
  end

  def start_in_phile
    unless (0...phile.body.length).include?(start)
      errors.add(:start, "must start in file")
    end
  end

  def finish_in_phile
    unless (0...phile.body.length).include?(finish)
      errors.add(:finish, "must finish in file")
    end
  end
end
