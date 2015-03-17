json._page @search_results.current_page

json.results @search_results.map(&:searchable) do |model|
  # json.partial! model
  if model.class == User
    json.partial! "api/users/user", user: model
  else
    json.partial! "api/model", :id, :name
  end
end
