json.extract! @phile, :id, :name, :body, :length

json.notes do
  json.array! @phile.notes, :id, :start, :finish, :body
end
