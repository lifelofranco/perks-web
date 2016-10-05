require 'rails_helper'

describe Edsa do

  context 'when passing invalid arguments' do
    it 'should raise InvalidMetricNameError' do
      expect { Edsa.get_metrics('invalid_metric', {}) }
        .to raise_error(Edsa::InvalidMetricNameError)
    end

    it 'should raise MissingArgumentsError' do
      metric_name = 'company_perks_metric'
      args = {
        start_date: '2014-05-01',
        company_id: 1
      }
      expect { Edsa.get_metrics(metric_name, args) }
        .to raise_error(Edsa::MissingArgumentsError)
    end
  end
end
