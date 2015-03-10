class CreatePhiles < ActiveRecord::Migration
  def change
    create_table :philes do |t|
      t.integer :owner_id, null: false
      t.string  :name, null: false
      t.text    :body, null: false
    end

    add_index :philes, :owner_id
  end
end
