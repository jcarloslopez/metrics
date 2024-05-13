import { API_BASE_URL } from "../constants";
import request, { getQueryParams } from "../utils/request";

export const getMetrics = async (): Promise<Array<string>> =>
  request(`${API_BASE_URL}/api/metrics`);

export const getMetricAverages = async (
  name: string,
  { period, from, to }: { period: string; from: string; to: string }
): Promise<Record<string, number>> =>
  request(
    `${API_BASE_URL}/api/metrics/${name}/averages?${getQueryParams({
      period,
      from,
      to,
    })}`
  );

export const createMetric = async (
  params: Record<string, any>
): Promise<Record<string, any>> =>
  request(`${API_BASE_URL}/api/metrics/`, {
    method: "POST",
    body: JSON.stringify(params),
  });
