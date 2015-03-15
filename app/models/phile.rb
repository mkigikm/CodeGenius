class Phile < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name
  
  validates :owner, :name, :body, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :philes
  )

  has_many(
    :notes,
    class_name: "Note",
    foreign_key: :phile_id,
    inverse_of: :phile
  )

  def length
    body.length
  end
end
