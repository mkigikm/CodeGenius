class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false
      t.integer :target_id, null: false
    end

    add_index :follows, :follower_id
    add_index :follows, :target_id
  end
end
