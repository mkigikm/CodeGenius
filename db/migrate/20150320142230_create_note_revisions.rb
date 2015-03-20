class CreateNoteRevisions < ActiveRecord::Migration
  def change
    create_table :note_revisions do |t|
      t.integer :note_id, null: false
      t.integer :author_id, null: false
      t.string :body, null: false

      t.timestamps
    end

    add_index :note_revisions, :note_id
  end
end
