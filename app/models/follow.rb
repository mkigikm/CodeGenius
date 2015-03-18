class Follow < ActiveRecord::Base
  validates :follower, :target, presence: true
  validates :target, uniqueness: { scope: :follower }
  validate :cant_follow_self

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    inverse_of: :follower_follows
  )

  belongs_to(
    :target,
    class_name: "User",
    foreign_key: :target_id,
    inverse_of: :target_follows
  )

  def cant_follow_self
    errors.add(:target, "can't follow self") if target == follower
  end

  has_many(
    :notifications,
    as: :notifiable,
    inverse_of: :notifiable,
    dependent: :destroy
  )

  after_commit :set_notification, on: [:create]

  private
  def set_notification
    notification = self.notifications.new
    notification.user = self.target
    notification.save
  end
end
