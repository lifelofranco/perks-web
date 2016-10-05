# This module is the primary reporting engine for
# Muber Perks. It is responsible to process analytics
# requests from the client and returns the right
# response via the controller.
#
# Author::    Francis Plaza (mailto:francis@muber.com) <br>
#             Leo Lope Lofranco (mailto:leo@muber.com) <br>
#             Life Christian Lofranco (mailto:life@muber.com)
# Copyright:: Copyright (c) 2014 Muber, Inc.
# License::   Proprietary
#
module Edsa
  require 'edsa/metrics'

  # Default by value for metric query.
  # It defaults to <i>department</i>.
  DEFAULT_BY = 'department'

  # All valid metrics from YAML file.
  METRICS = Metrics.all

  class InvalidMetricNameError < StandardError; end
  class MissingArgumentsError < StandardError; end

  class << self

    # Executes the right metric query based on
    # the given metric_name. Raises InvalidMetricNameError if
    # given metric_name is not valid.
    # [+metric_name+] Name of metric from available metric names.
    # [+args+] Hash of inputs required for that metric.
    def get_metrics(metric_name, args)
      fail InvalidMetricNameError unless METRICS.valid_metric?(metric_name)
      fail MissingArgumentsError unless METRICS.required_args_present?(metric_name, args)
      @args = args
      send metric_name
    end

    private

    def company_perks_metric
      company = Company.find(@args[:company_id])
      start_date = @args[:start_date].to_datetime
      end_date = @args[:end_date].to_datetime
      filter_by = @args[:filter_by] || DEFAULT_BY
      range = start_date.beginning_of_day..end_date.end_of_day

      deals = company.employee_deals
                     .where(used_at: range)
                     .where('used_at IS NOT NULL')

      # initialize the hash with empty values
      @result = {}
      (start_date.to_date..end_date.to_date).each do |date|
        @result[date.strftime('%Y-%m-%d')] = Hash['Cellphones', 0,
                                              'Dining', 0,
                                              'Entertainment', 0,
                                              'Fitness', 0,
                                              'Shopping', 0,
                                              'Spa and Massage', 0,
                                              'Travel', 0,
                                              'Utilities', 0]
      end

      case filter_by
      when 'department'
        group_f = 'employee'
      when 'category'
        group_f = 'deal'
      end

      deals.each do |d|
        cat = d.send(group_f).send(filter_by)
        date = d.used_at.strftime('%Y-%m-%d')
        @result[date][cat] = @result[date][cat].to_i.succ
      end

      @metric = []
      @result.each_pair { |key, value| @metric << Hash['date', key, 'value', value] }

      Jbuilder.encode do |json|
        json.company_id company.id
        json.start_date start_date.strftime('%Y-%m-%d')
        json.end_date end_date.strftime('%Y-%m-%d')
        json.result @metric
      end
    end

    def total_used_perk_value_by_type
      company = Company.find(@args[:company_id])
      start_date = @args[:start_date].to_datetime
      end_date = @args[:end_date].to_datetime
      range = start_date.beginning_of_day..end_date.end_of_day

      deals = company.employee_deals
                     .where(used_at: range)
                     .where('used_at IS NOT NULL')

      values = {}

      deals.each do |d|
        deal = d.deal
        e = {
          actual_value: deal.actual_value,
          discounted_value: deal.discounted_value
        }
        if values[d.deal.category]
          values[d.deal.category] = values[d.deal.category].merge(e) { |_k, o, n| o + n }
        else
          values[d.deal.category] = e
        end
      end

      @metric = []
      values.each_pair { |key, value| @metric << Hash[key, value] }

      Jbuilder.encode do |json|
        json.company_id company.id
        json.start_date start_date.strftime('%Y-%m-%d')
        json.end_date end_date.strftime('%Y-%m-%d')
        json.result @metric
      end
    end
  end
end
