unless Rails.env.test?
  MIXPANEL_CONFIG = YAML.load_file("#{::Rails.root}/config/mixpanel.yml")[::Rails.env]
end
