Rails.application.routes.draw do

  root 'index#home'
  get 'services', to: 'index#services'
  get 'about', to: 'index#about'
  get 'contact', to: 'index#contact'
  get 'portfolio', to: 'index#projects'

  get 'messages/new'
  get 'messages/create'

  get 'about', to: 'index#about'

  # Message Mailer
end
