class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :phile_id,  null: false
      t.integer :start,     null: false
      t.integer :length,    null: false
      t.integer :author_id, null: false
      t.text    :body,      null: false
    end

    add_index :annotations, :phile_id
    add_index :annotations, :author_id
  end
end
