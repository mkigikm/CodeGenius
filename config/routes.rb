Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resource :follow, only: [:create, :destroy]
  end
  resource :session, only: [:new, :create, :destroy]
  resources :philes, only: [:create, :show]
  resources :notes, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :philes, only: [:show, :create, :destroy]
    resources :notes, only: [:create, :update]
    resources :users, only: :show
  end

  root to: "users#new"
end
