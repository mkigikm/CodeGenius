describe User, type: :model do
  let (:email) { "matt@example.com" }

  describe "account creation" do
    it "requires an email address" do
      user = User.new(password: "password")
      user.valid?

      expect(user.errors.keys).to include :email
    end

    it "requires a password of at least length 6" do
      user = User.new(email: email, password: "passw")
      user.valid?

      expect(user.errors.keys).to include :password
    end

    it "creates a session token" do
      user = User.new(email: email, password: "password")

      expect(user.session_token).to_not be_nil
    end

    it "doesn't save the password to the database" do
      User.create(email: email, password: "password")
      user = User.find_by(email: email)

      expect(user.password).to be_nil
    end

    it "requires unique email addresses" do
      user0 = User.create(email: email, password: "password")
      user1 = User.new(email: email, password: "password")
      user1.valid?

      expect(user1.errors.keys).to include :email
    end
  end

  describe "User#find_by_credentials" do
    before :each do
      User.create(email: email, password: "password")
    end

    it "finds no account if the email doesn't exist in the database" do
      user = User.find_by_credentials("matt@bogo.com", "password")

      expect(user).to be_nil
    end

    it "finds no account if the password doesn't match" do
      user = User.find_by_credentials(email, "passwrod")

      expect(user).to be_nil
    end

    it "finds accounts that match the credentials" do
      user = User.find_by_credentials(email, "password")

      expect(user.email).to eq email
    end
  end
end
