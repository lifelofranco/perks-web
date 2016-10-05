module Edsa
  # This class initializes the list of metrics
  # available sourced from a given YAML file. It
  # also checks for validity of a given metric
  # from the client.
  #
  # Author::    Francis Plaza (mailto:francis@muber.com) <br>
  #             Leo Lope Lofranco (mailto:leo@muber.com) <br>
  #             Life Christian Lofranco (mailto:life@muber.com)
  # Copyright:: Copyright (c) 2014 Muber, Inc.
  # License::   Proprietary
  #
  class Metrics
    class << self
      # Loads and instantiates new Metrics from a given YAML file.
      def from_file(yaml_file)
        self.new(YAML.load_file(yaml_file))
      end

      # Sets all metrics from a specified metrics YAML file.
      def all
        @@all_metrics ||= self.from_file(
          File.join(Rails.root, 'config', 'metrics.yml')
        )
      end
    end

    def initialize(metrics)
      @metrics = metrics
    end

    # Returns all valid metric names.
    def metric_names
      @metrics.keys
    end

    # Returns true if metric belongs to array of valid metrics.
    # Otherwise, this method returns false.
    # [+metric+] Name of metric to check for validity.
    def valid_metric?(metric)
      @metrics.keys.include? metric
    end

    # Returns true if given args contains all required args.
    # Otherwise, this method returns false.
    # [+metric+] Name of metric to check for args.
    # [+args+] Hash of args of given metric.
    def required_args_present?(metric, args)
      (@metrics[metric]['required'] - args.keys).empty?
    end
  end
end
