import "./metric.css";

import {
  useLoaderData,
  LoaderFunctionArgs,
  useSubmit,
  Form,
  useNavigation,
} from "react-router-dom";
import ReactApexChart, { Props as ReactApexChartProps } from "react-apexcharts";
import { getMetricAverages } from "../../../api/metrics";

type MetricsType = Record<string, number>;
type LoaderDataType = {
  name: string;
  metrics: MetricsType;
  filters: Record<string, string>;
};

const defaultFilters = {
  from: "2024-03-14",
  to: "2024-07-30",
  period: "day",
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<LoaderDataType> {
  const url = new URL(request.url);
  const period = url.searchParams.get("period") || defaultFilters.period;
  const from = url.searchParams.get("from") || defaultFilters.from;
  const to = url.searchParams.get("to") || defaultFilters.to;

  const filters = { period, from, to };

  const metrics: MetricsType = await getMetricAverages(
    params.metricName as string,
    filters
  );

  return { name: params.metricName || "", metrics, filters };
}

const Metric: React.FC = () => {
  const { name, metrics, filters } = useLoaderData() as LoaderDataType;
  const navigation = useNavigation();
  const submit = useSubmit();

  const chart: ReactApexChartProps = {
    series: [
      {
        name,
        data: Object.values(metrics) as Array<number>,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: Object.keys(metrics),
      },
      yaxis: {
        decimalsInFloat: 2,
      },
    },
  };

  return (
    <>
      <h1 className="title">{name}</h1>
      <p className="subtitle">
        The metrics are shown in a timeline with averages per minute/hour/day
      </p>

      <Form className="form inline">
        <div>
          <label htmlFor="period">Period:</label>
          <select
            id="period"
            name="period"
            defaultValue={filters.period}
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          >
            <option value="day">Day</option>
            <option value="hour">Hour</option>
            <option value="minute">Minute</option>
          </select>
        </div>
        <div>
          <label htmlFor="from">From:</label>
          <input
            type="date"
            id="from"
            name="from"
            defaultValue={filters.from}
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
        </div>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="date"
            id="to"
            name="to"
            defaultValue={filters.to}
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
        </div>
      </Form>

      <div className="chart">
        <div
          className={`loading-screen ${
            navigation.state === "loading" ? "active" : ""
          }`}
        >
          Calculating nuclear attack...
        </div>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="line"
          height="450px"
        />
      </div>
    </>
  );
};

export default Metric;
