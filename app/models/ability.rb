class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    can :destroy, Phile do |phile|
      phile.try(:owner) == user
    end

    can :destroy, Note do |note|
      note.try(:phile).try(:owner) == user
    end
  end
end
