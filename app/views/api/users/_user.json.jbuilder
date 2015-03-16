json.extract! user, :id, :name
json.is_current_user current_user == user
json.following current_user.follows.include?(user)
json.avatar_url image_url(user.avatar.url)
