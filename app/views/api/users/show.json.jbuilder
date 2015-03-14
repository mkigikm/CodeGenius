json.extract! @user, :id, :email

json.is_current_user current_user == @user

json.philes do
  json.array! @user.philes, :id, :name, :created_at
end

json.follows do
  json.array! @user.follows, :id, :email
end

json.following current_user.follows.include?(@user)
