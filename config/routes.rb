Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resource :follow, only: [:create, :destroy]
  end

  resource :session, only: [:new, :create, :destroy]
  get "/auth/:provider/callback", to: "sessions#omniauth"

  resources :philes, only: [:create, :show]

  resources :notes, only: [:show]

  get "search", to: "searches#index"

  namespace :api, defaults: { format: :json } do
    resources :philes, only: [:show, :create, :destroy] do
      resource :tagging, only: :create
    end
    resources :taggings, only: :destroy

    resources :notes, only: [:create, :update, :show, :destroy] do
      post "revert/:revision_id", to: "notes#revert"
    end

    resources :users, only: [:show, :update] do
      resource :follow, only: [:create, :destroy]
      resources :philes, only: :index
      get "feed", to: "users#feed"
    end

    get "search", to: "searches#index"
  end

  root to: "home_pages#index"
end
