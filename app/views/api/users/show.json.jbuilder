json.extract! @user, :id, :email

json.is_current_user current_user == @user

json.philes do
  json.array! @user.philes, :id, :name, :created_at
end
