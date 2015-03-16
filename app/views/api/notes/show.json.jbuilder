json.extract! @note, :id, :body, :author_id
json.is_phile_owner @note.phile.owner == current_user
json.author_name @note.author.name
