class RenameAnnotationsToNotes < ActiveRecord::Migration
  def change
    rename_table :annotations, :notes
  end
end
