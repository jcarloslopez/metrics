import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { loader as appLoader } from "./components/routes/App/app";
import Metric, {
  loader as metricLoader,
} from "./components/routes/Metrics/metric";
import MetricsIndex from "./components/routes/Metrics/index";
import MetricsNew, {
  action as metricNewAction,
} from "./components/routes/Metrics/new";
import Error from "./components/routes/Error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    loader: appLoader,
    children: [
      { index: true, element: <MetricsIndex /> },
      {
        path: "metrics/:metricName",
        element: <Metric />,
        errorElement: <Error />,
        loader: metricLoader,
      },
      {
        path: "metrics/new",
        element: <MetricsNew />,
        errorElement: <Error />,
        action: metricNewAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
