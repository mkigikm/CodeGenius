class AddTimestampDefaults < ActiveRecord::Migration
  def up
    [Follow, Note, Phile, User].each do |model|
      model.update_all(created_at: Time.now)
      model.update_all(updated_at: Time.now)
    end
  end
end
