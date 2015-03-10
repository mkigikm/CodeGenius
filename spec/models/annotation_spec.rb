describe Annotation, type: :model do
  it { should validate_presence_of :start }
  it { should validate_presence_of :finish }
  it { should validate_presence_of :body }

  it { should belong_to :phile }
  it { should belong_to :author }

  let (:phile) do
    double("phile").tap do |phile|
      allow(phile).to receive(:length).and_return 128
      allow(phile).to receive(:marked_for_destruction?).and_return false
    end
  end

  describe "start < finish" do
    it "allows start < finish" do
      annotation = Annotation.new(start: 0, finish: 10)
      allow(annotation).to receive(:phile).and_return phile
      annotation.valid?

      expect(annotation.errors.keys).to_not include :start
    end

    it "doesn't allow start > finish" do
      annotation = Annotation.new(start: 20, finish: 10)
      allow(annotation).to receive(:phile).and_return phile
      annotation.valid?

      expect(annotation.errors.keys).to include :start
    end

    it "doesn't allow start == finish" do
      annotation = Annotation.new(start: 10, finish: 10)
      allow(annotation).to receive(:phile).and_return phile
      annotation.valid?

      expect(annotation.errors.keys).to include :start
    end
  end


  describe "validates annotations are in the phile" do
    it "passes when start and finish are in the file" do
      annotation = Annotation.new(start: 0, finish: 127)
      allow(annotation).to receive(:phile).and_return phile
      annotation.valid?

      expect(annotation.errors.keys).to_not include :start
      expect(annotation.errors.keys).to_not include :finish
    end

    it "fails when start is less than 0" do
      annotation = Annotation.new(start: -1, finish: 127)
      allow(annotation).to receive(:phile).and_return phile
      annotation.valid?

      expect(annotation.errors.keys).to include :start
    end

    it "fails when finish is out of the phile" do
      annotation = Annotation.new(start: 0, finish: 128)
      allow(annotation).to receive(:phile).and_return phile
      annotation.valid?

      expect(annotation.errors.keys).to include :finish
    end
  end

  describe "Annotation#annotations_cannot_overlap" do
    it "finds overlaps that start before the annotation"
    it "finds overlaps that start after the annotation"
    it "finds overlaps that start in the annotation"
    it "finds overlaps that contain the annotation"
  end
end
