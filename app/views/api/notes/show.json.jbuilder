json.extract! @note, :id, :body, :author_id
json.is_current_user @note.phile.owner == current_user
