describe Follow, type: :model do
  it { should belong_to :follower }
  it { should have_many :target }
end
