Rails.application.routes.draw do

  root 'index#home'
  get 'services', to: 'index#services'
  get 'about', to: 'index#about'
  get 'contact', to: 'index#contact'
  get 'portfolio', to: 'index#projects'
  get 'portfolio/project_backyard', to: 'projects#project_backyard', as: 'project_backyard'

  get 'messages/new'
  get 'messages/create'

  #Error routes
  match '/404', to: 'errors#file_not_found', via: :all
  match '/422', to: 'errors#unprocessable', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all

  # Invalid routes
  get '*unmatched_route', to: 'errors#file_not_found'

  # Message Mailer
end
