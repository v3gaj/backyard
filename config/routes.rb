Rails.application.routes.draw do

  get 'errors/file_not_found'
  get 'errors/internal_server'
  get 'errors/unprocessable'
  get 'file_not_found/internal_server'
  get 'file_not_found/unprocessable'
  root 'index#home'
  get 'services', to: 'index#services'
  get 'about', to: 'index#about'
  get 'contact', to: 'index#contact'
  get 'portfolio', to: 'index#projects'

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
