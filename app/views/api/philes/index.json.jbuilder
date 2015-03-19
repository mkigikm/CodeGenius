json.array! @philes do |phile|
  json.extract! phile, :id, :name, :created_at
  json.taggings phile.taggings do |tagging|
    json.name tagging.tag.name
    json.id tagging.id
  end
end
