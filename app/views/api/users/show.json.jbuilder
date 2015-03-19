json.partial! "user", user: @user

# json.philes do
#   json.array! @user.philes, :id, :name, :created_at
# end

json.follows @user.follows, partial: "user", as: :user
