json.extract! @phile, :id, :name, :body, :length
json.is_signed_in signed_in?

json.notes do
  json.array! @phile.notes, :id, :start, :finish
end
