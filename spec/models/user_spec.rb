describe User, type: :model do
  let (:name) { "matt@example.com" }

  it { should validate_presence_of :name }

  it { should have_many :philes }
  it { should have_many :notes }

  describe "account creation" do
    it "requires a password of at least length 6" do
      user = User.new(name: name, password: "passw")
      user.valid?

      expect(user.errors.keys).to include :password
    end

    it "creates a session token" do
      user = User.new(name: name, password: "password")

      expect(user.session_token).to_not be_nil
    end

    it "doesn't save the password to the database" do
      User.create(name: name, password: "password")
      user = User.find_by(name: name)

      expect(user.password).to be_nil
    end

    it "requires unique name addresses" do
      user0 = User.create(name: name, password: "password")
      user1 = User.new(name: name, password: "password")
      user1.valid?

      expect(user1.errors.keys).to include :name
    end
  end

  describe "User#find_by_credentials" do
    before :each do
      User.create(name: name, password: "password")
    end

    it "finds no account if the name doesn't exist in the database" do
      user = User.find_by_credentials("matt@bogo.com", "password")

      expect(user).to be_nil
    end

    it "finds no account if the password doesn't match" do
      user = User.find_by_credentials(name, "passwrod")

      expect(user).to be_nil
    end

    it "finds accounts that match the credentials" do
      user = User.find_by_credentials(name, "password")

      expect(user.name).to eq name
    end
  end

  describe "#reset_session_token" do
    it "changes the session token" do
      user = User.create(name: name, password: "password")
      expect { user.reset_session_token! }.to change { user.session_token }
    end
  end
end
