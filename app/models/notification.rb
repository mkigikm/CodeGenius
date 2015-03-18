class Notification < ActiveRecord::Base
  belongs_to :user, inverse_of: :notifications
  belongs_to :notifiable, inverse_of: :notifications, polymorphic: true

  validates :notifiable, :user, presence: true
end
