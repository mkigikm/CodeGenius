class Phile < ActiveRecord::Base
  validates :owner, :name, :body, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :philes
  )

  has_many(
    :annotations,
    class_name: "Annotation",
    foreign_key: :phile_id,
    inverse_of: :phile
  )
end
