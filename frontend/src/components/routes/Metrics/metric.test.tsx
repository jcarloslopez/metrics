import React from "react";
import { render, screen } from "@testing-library/react";
import Metrics from "./metric";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// Chars library has a bug that causes it to fail when running in a test environment
jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("Metrics route", () => {
  let setup: React.ReactElement;

  beforeAll(() => {
    const routes = [
      {
        path: "/metrics/:name",
        element: <Metrics />,
        loader: () => ({
          name: "metric_test",
          metrics: {
            "2022-12-02 00:00:00 UTC": 6.0,
            "2022-12-03 00:00:00 UTC": 47.125,
            "2022-12-04 00:00:00 UTC": 64.0,
          },
          filters: {
            period: "day",
            from: "2022-12-01",
            to: "2022-12-31",
          },
        }),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/metrics/metric_test"],
    });

    setup = <RouterProvider router={router} />;
  });

  test("renders", () => {
    render(setup);

    const title = screen.getByText("metric_test");
    expect(title).toBeInTheDocument();
  });

  test("renders filter form with preloaded values", () => {
    render(setup);

    const period = screen.getByRole("combobox", { name: /period/i });

    expect(period).toHaveValue("day");

    const from = screen.getByLabelText(/from/i);
    const to = screen.getByLabelText(/to/i);

    expect(from).toHaveValue("2022-12-01");
    expect(to).toHaveValue("2022-12-31");
  });

  test("can select different period values", async () => {
    render(setup);

    const period = screen.getByRole("combobox", { name: /period/i });

    await userEvent.selectOptions(period, "hour");
    expect(period).toHaveValue("hour");

    await userEvent.selectOptions(period, "minute");
    expect(period).toHaveValue("minute");

    await userEvent.selectOptions(period, "day");
    expect(period).toHaveValue("day");
  });
});
