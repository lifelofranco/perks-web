require 'rails_helper'

describe Edsa::Metrics do

  it 'should load all metrics from the yaml file' do
    metrics = Edsa::Metrics.all
    expected_value = %w(company_perks_metric total_used_perk_value_by_type)
    expect(metrics.metric_names).to eq(expected_value)
  end

end
