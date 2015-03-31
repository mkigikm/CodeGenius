class Tagging < ActiveRecord::Base
  validates :tag, :phile, presence: true
  validates :tag, uniqueness: { scope: :phile }

  belongs_to :tag
  belongs_to(
    :phile,
    dependent: :destroy
  )
end
