Rails.application.routes.draw do
  devise_for :users, path:'',:path_names => {:sign_in => 'login', :sign_out => 'logout'}
  root to: "dashboard/posts#new"
  
  get "/dashboard" => 'dashboard/posts#new', as:"dashboard"
  namespace :dashboard do
    resources :posts, only: [:index, :new, :edit, :create, :update, :destroy]
    resources :tags, only:[:index,:new,:create,:edit,:show,:update,:destroy]
  	
  	get "/about" => '/dashboard/about#get'
  	post "/about" => '/dashboard/about#post'
  	patch "/about" => '/dashboard/about#post'
 
  end
 
  get "/api/posts" => 'api/posts#all', as:"api"
 

end
