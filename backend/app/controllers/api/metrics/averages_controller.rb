class Api::Metrics::AveragesController < ApplicationController
  def index
    @metrics = Metric.where(name: filter_params[:metric_id])

    @metrics = @metrics.where("timestamp >= ?", filter_params[:from]) if filter_params[:from].present?
    @metrics = @metrics.where("timestamp <= ?", filter_params[:to]) if filter_params[:to].present?

    @metrics = @metrics
      .order(Arel.sql("DATE_TRUNC('#{filter_params[:period]}', timestamp) ASC"))
      .group("DATE_TRUNC('#{filter_params[:period]}', timestamp)")
      .average(:value)

    render json: @metrics
  end


  private
    def filter_params
      params  
      .permit(:metric_id, :from, :to, :period)
      .delete_if { |key, value| key == "period" && !["minute", "hour", "day"].include?(value) }
      .with_defaults(period: "day")
    end
end
