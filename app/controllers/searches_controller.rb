class SearchesController < ApplicationController
  def index
    PgSearch.multisearch_options = {using: {:tsearch => {:prefix => true}}}
    @search_results = PgSearch
      .multisearch(params[:query])
      .page(params[:page])
    @no_search = true
  end
end
