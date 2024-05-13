import "./metric.css";

import { Form, redirect, ActionFunctionArgs } from "react-router-dom";
import { createMetric } from "../../../api/metrics";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const params = Object.fromEntries(formData);

  await createMetric({ metric: { ...params, timestamp: new Date().toJSON() } });

  return redirect(`/metrics/${params.name}`);
};

const MetricNew: React.FC = () => {
  return (
    <div>
      <h1 className="title">New metric</h1>
      <p className="subtitle">Add a new metric</p>

      <Form method="post" className="form">
        <label htmlFor="name">Name</label>
        <input
          aria-label="Metric name"
          type="text"
          name="name"
          id="name"
          required
        />

        <label htmlFor="value">Value</label>
        <input
          aria-label="Metric value"
          type="number"
          name="value"
          id="value"
          required
        />

        <button type="submit">Create</button>
      </Form>
    </div>
  );
};

export default MetricNew;
