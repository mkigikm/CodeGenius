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
    resources :philes, only: [:show, :create, :destroy]
    resources :notes, only: [:create, :update, :show, :destroy]
    resources :users, only: [:show, :update] do
      resource :follow, only: [:create, :destroy]
      get "feed", to: "users#feed"
    end
    get "search", to: "searches#index"
  end

  root to: "users#new"
end
