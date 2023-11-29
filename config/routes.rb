Rails.application.routes.draw do
  resources :games

  # route to test your configuration
  get '/hello', to: 'application#hello_world'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/game', to: 'games#create'

  
end
