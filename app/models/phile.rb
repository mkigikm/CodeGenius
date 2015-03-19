class Phile < ActiveRecord::Base
  include PgSearch
  multisearchable against: :body

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
    inverse_of: :phile
  )

  has_many :taggings

  default_scope { order("created_at DESC") }

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

  private
  def set_notifications
    self.owner.followers.each do |follower|
      notification = self.notifications.new
      notification.user = follower
      notification.save
    end
  end
end
