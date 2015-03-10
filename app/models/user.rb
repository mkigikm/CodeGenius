class User < ActiveRecord::Base
  validates :email, :session_token, :password_digest, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many(
    :philes,
    class_name: "Phile",
    foreign_key: :owner_id,
    inverse_of: :owner
  )

  has_many(
    :annotations,
    class_name: "Annotation",
    foreign_key: :author_id,
    inverse_of: :author
  )

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

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
