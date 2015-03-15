json.extract! @user, :id, :name

json.is_current_user current_user == @user

json.philes do
  json.array! @user.philes, :id, :name, :created_at
end

json.follows do
  json.array!(@user.follows) do |user|
    json.extract! user, :id, :name
    json.following current_user.follows.include?(user)
    json.is_current_user current_user == user
  end
end

json.following current_user.follows.include?(@user)
