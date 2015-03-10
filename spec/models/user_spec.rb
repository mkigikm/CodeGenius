describe User, type: :model do
  describe "account creation" do
    it "requires an email address" do
      u = User.create(password: "password")
      expect(u.valid?).to be false
    end

    it "requires a password of at least length 6" do
      u = User.create(email: "matt@example.com", password: "passw")
      expect(u.valid?).to be false
    end

    it "creates a session token" do
      u = User.create(email: "matt@example.com", password: "password")
      expect(u.session_token).to_not be_nil
    end

    it "doesn't save the password to the database" do
      u = User.create(email: "matt@example.com", password: "password")
      u = User.find_by(email: "matt@example.com")
      expect(u.password).to be_nil
    end
  end
end
