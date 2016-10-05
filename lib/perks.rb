module Perks

  class << self

    def i18n(options)
      @file = Dir.glob([Rails.root, 'config', 'locales', options[:locale] + '.yml'].join('/'))
      @locale = YAML.load_file(@file[0])[options[:locale]]

      @locale
    rescue
      {}
    end

    def app_git_commit
      @app_git_config = {}.tap do |h|
        output = `cd #{Rails.root} && git log -n1 --pretty="format:%h%n%H%n%ci%n%s"`.split("\n")
        h[:sha] = output[0]
        h[:long_sha] = output[1]
        h[:date] = DateTime.parse(output[2]).iso8601
        h[:message] = output[3]

        output = `cd #{Rails.root} && git remote -v`
        if match = output.match(/git\@github\.com\:(.*)\/(.*?)(\s|\.git)/)
          h[:link] = "https://github.com/#{match[1]}/#{match[2]}/tree/#{h[:sha]}"
        end
      end

      # If the app doesn't have its full git repo in place, fetch the REVISION file instead
      if @app_git_config[:long_sha].nil? && File.exists?( File.join(Rails.root, 'REVISION') )
        @app_git_config[:long_sha] = File.read( File.join(Rails.root, 'REVISION') ).strip
      end

      @app_git_config
    rescue
      {}
    end
  end
end
