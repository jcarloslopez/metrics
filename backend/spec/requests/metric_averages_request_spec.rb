require 'rails_helper'

RSpec.describe "Metrics averages", type: :request do
  describe 'GET /index' do
    describe 'with period day' do
      let!(:metric) { FactoryBot.create(:metric, value: 10, timestamp: DateTime.new(2022, 11, 01)) }
      let!(:metric_same_day) { FactoryBot.create(:metric, value: 20, timestamp: DateTime.new(2022, 11, 01)) }
      let!(:metric_next_day) { FactoryBot.create(:metric, value: 30, timestamp: DateTime.new(2022, 11, 02)) }
    
      it 'returns both days' do
        get "/api/metrics/#{metric.name}/averages", params: { period: "day" }

        expect(json.size).to eq(2)
      end
    
      it 'returns daily averages' do
        get "/api/metrics/#{metric.name}/averages", params: { period: "day" }

        expect(json[json.keys.first]).to eq(15)
        expect(json[json.keys.last]).to eq(30)
      end
    end

    describe 'with period hour' do
      let!(:metric) { FactoryBot.create(:metric, value: 10, timestamp: DateTime.new(2022, 11, 01, 10)) }
      let!(:metric_same_hour) { FactoryBot.create(:metric, value: 20, timestamp: DateTime.new(2022, 11, 01, 10)) }
      let!(:metric_next_hour) { FactoryBot.create(:metric, value: 30, timestamp: DateTime.new(2022, 11, 01, 11)) }
    
      it 'returns both hours' do
        get "/api/metrics/#{metric.name}/averages", params: { period: "hour" }

        expect(json.size).to eq(2)
      end
    
      it 'returns hourly averages' do
        get "/api/metrics/#{metric.name}/averages", params: { period: "hour" }

        expect(json[json.keys.first]).to eq(15)
        expect(json[json.keys.last]).to eq(30)
      end
    end

    describe 'with period minute' do
      let!(:metric) { FactoryBot.create(:metric, value: 10, timestamp: DateTime.new(2022, 11, 01)) }
      let!(:metric_same_minute) { FactoryBot.create(:metric, value: 20, timestamp: DateTime.new(2022, 11, 01)) }
      let!(:metric_next_minute) { FactoryBot.create(:metric, value: 30, timestamp: DateTime.new(2022, 11, 01, 00, 01)) }
    
      it 'returns both minutes' do
        get "/api/metrics/#{metric.name}/averages", params: { period: "minute" }

        expect(json.size).to eq(2)
      end
    
      it 'returns minutely averages' do
        get "/api/metrics/#{metric.name}/averages", params: { period: "minute" }

        expect(json[json.keys.first]).to eq(15)
        expect(json[json.keys.last]).to eq(30)
      end
    end
  end
end
