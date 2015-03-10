describe Annotation, type: :model do
  it "validates start < end"

  describe "Annotation#(start|finish)_in_phile" do
    phile = double("phile")
    allow(phile).to receive(:length).and_return 128

    it "validates start > 0"
    it "validates start < phile.length"
  end

  describe "Annotation#annotations_cannot_overlap" do
    it "finds overlaps that start before the annotation"
    it "finds overlaps that start after the annotation"
    it "finds overlaps that start in the annotation"
    it "finds overlaps that contain the annotation"
  end
end
