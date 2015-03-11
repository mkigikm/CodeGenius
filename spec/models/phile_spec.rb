describe Phile, type: :model do
  it { should validate_presence_of :name }
  it { should validate_presence_of :body }

  it { should belong_to :owner }
  it { should have_many :notes }
end
