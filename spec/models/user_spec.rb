describe User, type: :model do
  let (:email) { "matt@example.com" }

  describe "account creation" do
    it "requires an email address" do
      u = User.new(password: "password")
      u.valid?

      expect(u.errors.keys).to include :email
    end

    it "requires a password of at least length 6" do
      u = User.new(email: email, password: "passw")
      u.valid?

      expect(u.errors.keys).to include :password
    end

    it "creates a session token" do
      u = User.new(email: email, password: "password")

      expect(u.session_token).to_not be_nil
    end

    it "doesn't save the password to the database" do
      User.create(email: email, password: "password")
      u = User.find_by(email: email)

      expect(u.password).to be_nil
    end

    it "requires unique email addresses" do
      u0 = User.create(email: email, password: "password")
      u1 = User.new(email: email, password: "password")
      u1.valid?

      expect(u1.errors.keys).to include :email
    end
  end

  describe "User#find_by_credentials" do
    before :each do
      User.create(email: email, password: "password")
    end

    it "finds no account if the email doesn't exist in the database" do
      u = User.find_by_credentials("matt@bogo.com", "password")

      expect(u).to be_nil
    end

    it "finds no account if the password doesn't match"
    it "finds accounts that match the credentials"
  end
end
