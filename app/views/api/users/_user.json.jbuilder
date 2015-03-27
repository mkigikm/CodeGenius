json.extract! user, :id, :name
json.email user.email if current_user == user
json.is_current_user current_user == user
json.following !signed_in? ? false : current_user.follows.include?(user)
json.avatar_url image_url(user.avatar.url)
