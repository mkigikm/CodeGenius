describe User, type: :model do
  describe "account creation" do
    it "requires an email address" do
      u = User.new(password: "password")
      u.valid?
      expect(u.errors.keys).to include :email
    end

    it "requires a password of at least length 6" do
      u = User.new(email: "matt@example.com", password: "passw")
      u.valid?
      expect(u.errors.keys).to include :password
    end

    it "creates a session token" do
      u = User.new(email: "matt@example.com", password: "password")
      expect(u.session_token).to_not be_nil
    end

    it "doesn't save the password to the database" do
      u = User.create(email: "matt@example.com", password: "password")
      u = User.find_by(email: "matt@example.com")
      expect(u.password).to be_nil
    end
  end
end
