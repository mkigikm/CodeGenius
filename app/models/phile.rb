class Phile < ActiveRecord::Base
  validates :owner, :name, :body, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :philes
  )
end
