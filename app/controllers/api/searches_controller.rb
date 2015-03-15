class Api::SearchesController < ApplicationController
  def index
    @search_results = PgSearch
      .multisearch(params[:query])
      .params(params[:page])
  end
end
