Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :user_times
  #get '/users/:id' => 'users#show'
	get '/login' => 'users#new'
  post '/signup' => 'users#create'
  get '/logout' => 'users#destroy'
end
