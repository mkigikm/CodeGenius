class Phile < ActiveRecord::Base
  validates :owner, :name, :body, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :philes
  )

  has_many(
    :notes,
    class_name: "Note",
    foreign_key: :phile_id,
    inverse_of: :phile,
    dependent: :destroy
  )

  has_many(
    :taggings,
    inverse_of: :phile
  )

  has_many(
    :tags,
    through: :taggings,
    inverse_of: :philes
  )

  default_scope { order("philes.created_at DESC") }

  def length
    body.length
  end

  has_many(
    :notifications,
    as: :notifiable,
    inverse_of: :notifiable,
    dependent: :destroy
  )

  after_commit :set_notifications, on: [:create]

  def self.most_active
    Phile.find_by_sql(<<-SQL
      SELECT philes.*, COUNT(notes.id)
      FROM philes
      JOIN notes ON philes.id = notes.phile_id
      GROUP BY philes.id
      ORDER BY COUNT(notes.id) DESC
      LIMIT 20
      SQL
    )
  end

  private
  def set_notifications
    self.owner.followers.each do |follower|
      notification = self.notifications.new
      notification.user = follower
      notification.save
    end
  end
end
