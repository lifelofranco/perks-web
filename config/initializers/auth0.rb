AUTH0_CONFIG = YAML.load_file("#{::Rails.root}/config/auth0.yml")[::Rails.env]

MuberAuth = Auth0Client.new({
  client_id: AUTH0_CONFIG['client_id'],
  client_secret: AUTH0_CONFIG['client_secret'],
  namespace: AUTH0_CONFIG['domain']
})
