class Notification < ActiveRecord::Base
  validates :notifiable, :user, presence: true

  belongs_to :user, inverse_of: :notifications
  belongs_to(
    :notifiable,
    inverse_of: :notifications,
    polymorphic: true,
    dependent: :destroy
  )

  default_scope { order("created_at DESC") }
end
