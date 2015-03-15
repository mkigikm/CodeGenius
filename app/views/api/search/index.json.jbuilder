json._page @search_results.current_page

json.results @search_results.map(&:searchable) do |model|
  # json.partial! model
  if model.class == User
    json.extract! model, :id, :name
  else
    json.extract! model, :id, :name
  end
end
