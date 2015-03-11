Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show] do
    resource :follow, only: [:create, :destroy]
  end
  resource :session, only: [:new, :create, :destroy]
  resources :philes, only: [:create, :show]
  resources :notes, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :philes, only: :show do
      resources :notes, only: [:create, :update, :destroy]
    end
  end

  root to: "users#new"
end
