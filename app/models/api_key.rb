class ApiKey < ActiveRecord::Base

	def self.generate(name)
    key = SecureRandom.urlsafe_base64(25)[0..19]
    ApiKey.create(:name => name, :key => key)
    key
  end

  def self.validate(key = nil)
    !ApiKey.find_by_key(key).nil?
  end

end
