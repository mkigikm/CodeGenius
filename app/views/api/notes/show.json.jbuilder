json.extract! @note, :id, :body, :author_id
json.is_phile_owner @note.phile.owner == current_user
json.author_name @note.author.name
json.revisions do
  json.array! @note.revisions do |revision|
    json.extract! revision, :id, :body, :author_id
    json.author_name revision.author.name
  end
end
