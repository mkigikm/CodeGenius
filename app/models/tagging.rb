class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :phile
end
