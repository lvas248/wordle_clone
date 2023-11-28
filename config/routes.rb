Rails.application.routes.draw do
  resources :users
  # route to test your configuration
  get '/hello', to: 'application#hello_world'

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  
end
