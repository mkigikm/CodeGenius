class Tag < ActiveRecord::Base
  validates :name, presence: true

  has_many(
    :taggings,
    inverse_of: :tag
  )

  has_many(
    :philes,
    through: :taggings,
    inverse_of: :tags
  )
end
