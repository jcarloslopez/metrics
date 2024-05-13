Rails.application.routes.draw do
  namespace :api do
    resources :metrics, only: [:index, :create] do
      resources :averages, only: %i[index], module: :metrics
    end
  end
end
