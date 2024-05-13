import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MetricsNew from "./new";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("Metrics new route", () => {
  let setup: React.ReactElement;
  let action = jest.fn();

  beforeAll(() => {
    const routes = [
      {
        path: "/metrics/new",
        element: <MetricsNew />,
        action,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/metrics/new"],
    });

    setup = <RouterProvider router={router} />;
  });

  test("renders", () => {
    render(setup);

    const title = screen.getByRole("heading", { name: /new metric/i });
    expect(title).toBeInTheDocument();
  });

  test("renders form fields", () => {
    render(setup);

    const name = screen.getByRole("textbox", { name: /name/i });
    const value = screen.getByRole("spinbutton", { name: /value/i });
    const button = screen.getByRole("button", { name: /create/i });

    expect(name).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("submits form", async () => {
    render(setup);

    const name = screen.getByRole("textbox", { name: /name/i });
    const value = screen.getByRole("spinbutton", { name: /value/i });

    await userEvent.type(name, "metric_test");
    await userEvent.type(value, "123");

    const button = screen.getByRole("button", { name: /create/i });

    await userEvent.click(button);

    expect(action).toHaveBeenCalled();
  });
});
