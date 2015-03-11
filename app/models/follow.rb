class Follow < ActiveRecord::Base
  validates :follower, :target, presence: true
  validates :target, uniqueness: { scope: :follower }

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
end
