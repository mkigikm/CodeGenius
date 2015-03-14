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
end
