class User < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name

  validates :name, :session_token, :password_digest, presence: true
  validates :name, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password, confirmation: true

  attr_reader :password

  after_initialize :ensure_session_token

  has_attached_file :avatar, default_url: "default-avatar.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many(
    :philes,
    class_name: "Phile",
    foreign_key: :owner_id,
    inverse_of: :owner
  )

  has_many(
    :notes,
    class_name: "Note",
    foreign_key: :author_id,
    inverse_of: :author
  )

  has_many(
    :follower_follows,
    class_name: "Follow",
    foreign_key: :follower_id,
    inverse_of: :follower
  )

  has_many(
    :follows,
    through: :follower_follows,
    source: :target
  )

  has_many(
    :target_follows,
    class_name: "Follow",
    foreign_key: :target_id,
    inverse_of: :target
  )

  has_many(
    :followers,
    through: :target_follows,
    source: :follower
  )

  has_many(
    :notifications,
    inverse_of: :user,
    dependent: :destroy
  )

  def self.find_by_credentials(name, password)
    user = User.find_by(name: name)

    user && user.is_password?(password) ? user : nil
  end

  def password=(new_password)
    @password = new_password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    save!
  end

  def following?(user)
    Follow.where(target_id: user.id).where(follower_id: id).count > 0
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(provider: auth_hash[:provider], uid: auth_hash[:uid])

    user || User.create(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid],
      name: auth_hash[:info][:nickname],
      password: SecureRandom::urlsafe_base64
    )
  end

  private
  def self.used_token?(session_token)
    !!User.find_by(session_token: session_token)
  end

  def generate_session_token
    new_token = nil
    while !new_token || self.class.used_token?(new_token)
      new_token = SecureRandom.urlsafe_base64
    end

    new_token
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
