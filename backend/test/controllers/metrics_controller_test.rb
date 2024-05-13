require "test_helper"

class MetricsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @metric = metrics(:one)
  end

  test "should get index" do
    get metrics_url, as: :json
    assert_response :success
  end

  test "should create metric" do
    assert_difference("Metric.count") do
      post metrics_url, params: { metric: { name: @metric.name, timestamp: @metric.timestamp, value: @metric.value } }, as: :json
    end

    assert_response :created
  end

  test "should show metric" do
    get metric_url(@metric), as: :json
    assert_response :success
  end

  test "should update metric" do
    patch metric_url(@metric), params: { metric: { name: @metric.name, timestamp: @metric.timestamp, value: @metric.value } }, as: :json
    assert_response :success
  end

  test "should destroy metric" do
    assert_difference("Metric.count", -1) do
      delete metric_url(@metric), as: :json
    end

    assert_response :no_content
  end
end
