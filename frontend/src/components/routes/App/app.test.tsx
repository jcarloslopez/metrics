import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./app";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("App route", () => {
  let setup: React.ReactElement;

  beforeAll(() => {
    const routes = [
      {
        path: "/",
        element: <App />,
        loader: () => ({
          metrics: ["metric_one"],
        }),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    setup = <RouterProvider router={router} />;
  });

  test("renders the sidebar", () => {
    render(setup);

    const title = screen.getByText(/metrics list/i);
    expect(title).toBeInTheDocument();
  });

  test("renders the metrics loaded", () => {
    render(setup);

    const link = screen.getByRole("link", { name: /metric_one/i });
    expect(link).toBeInTheDocument();
  });

  test("renders the new button", () => {
    render(setup);

    const button = screen.getByRole("button", { name: /new metric/i });
    expect(button).toBeInTheDocument();
  });

  test("renders the content container where the children routes will be rendered", () => {
    render(setup);

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });
});
