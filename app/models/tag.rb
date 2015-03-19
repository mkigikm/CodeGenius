class Tag < ActiveRecord::Base
  validates :name, presence: true
  has_many :taggings
end
