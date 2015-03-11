json.extract! @phile, :name, :body, :length

json.notes do
  json.array! @phile.notes, :start, :finish, :body
end
