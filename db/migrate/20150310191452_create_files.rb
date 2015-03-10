class CreateFiles < ActiveRecord::Migration
  def change
    create_table :files do |t|
      t.integer :owner_id, null: false
      t.string  :name, null: false
      t.text    :body, null: false
    end

    add_index :files, :owner_id
  end
end
