class AddTimestamps < ActiveRecord::Migration
  def change
    [:follows, :notes, :philes, :users].each do |table|
      add_timestamps table
    end
  end
end
