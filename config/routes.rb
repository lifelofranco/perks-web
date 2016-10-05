Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  root to: 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :merchants
      resources :deals
      resources :companies
      resources :employees

      get 'merchants/:id/deals' => 'merchants#deals'
      get 'companies/:id/employees' => 'companies#employees'
      get 'employees/:id/company' => 'employees#company'
      get 'employees/:id/deals' => 'employees#deals'

      # Metrics API
      match 'metrics/get_metrics' => 'metrics#metrics', via: [:get, :post]

      get 'app/git_commit' => 'perks#get_app_git_commit'
      get 'app/i18n(/:locale)' => 'perks#get_i18n'
    end
  end

  get '*path' => 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
