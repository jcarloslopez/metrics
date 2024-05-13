require 'rails_helper'

RSpec.describe "Metrics", type: :request do
  describe 'GET /index' do
    let!(:metric1) { FactoryBot.create(:metric, name: "name one") }
    let!(:metric1copy) { FactoryBot.create(:metric, name: "name one") }
    let!(:metric2) { FactoryBot.create(:metric, name: "name two") }
    
    before do
      get '/api/metrics'
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end
    
    it 'returns only distinct metric names' do
      expect(json.size).to eq(2)
      expect(json).to include("name one")
      expect(json).to include("name two")
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      before do
        post "/api/metrics", params: { :metric => { :name => 'test', :value => 10, :timestamp => DateTime.new(2022, 11, 01) } }
      end

      it 'creates a new metric' do
        expect(Metric.count).to eq(1)
      end
      
      it 'returns the metrics name' do
        expect(JSON.parse(response.body)['name']).to eq('test')
      end
    
      it 'returns the metrics value' do
        expect(JSON.parse(response.body)['value']).to eq(10)
      end
    
      it 'returns the metrics timestamp' do
        expect(JSON.parse(response.body)['timestamp']).to eq('2022-11-01T00:00:00.000Z')
      end
    
      it 'returns a created status' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      describe 'with missing name' do
        it 'returns an unprocessable entity status' do
          post "/api/metrics", params: { :metric => { :value => 10, :timestamp => DateTime.new(2022, 11, 01) } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      describe 'with missing value' do
        it 'returns an unprocessable entity status' do
          post "/api/metrics", params: { :metric => { :name => 'test', :timestamp => DateTime.new(2022, 11, 01) } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      describe 'with missing timestamp' do
        it 'returns an unprocessable entity status' do
          post "/api/metrics", params: { :metric => { :name => 'test', :value => 10 } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end
end
