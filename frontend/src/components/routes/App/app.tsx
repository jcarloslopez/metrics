import "./app.css";

import { Outlet, Link, useLoaderData, NavLink } from "react-router-dom";
import { getMetrics } from "../../../api/metrics";

type LoaderDataType = {
  metrics: Array<string>;
};

export async function loader(): Promise<LoaderDataType> {
  const metrics = await getMetrics();

  return { metrics };
}

const App: React.FC = () => {
  const { metrics } = useLoaderData() as LoaderDataType;

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="title">Metrics list</h2>
        {metrics.length ? (
          <ul className="list">
            {metrics.map((metric: string) => (
              <li key={metric}>
                <NavLink
                  to={`metrics/${metric}`}
                  className={({ isActive }) =>
                    ["link", isActive ? "active" : null]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  {metric}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No metrics found</i>
          </p>
        )}
        <div className="button-container">
          <Link to="metrics/new">
            <button className="button">New metric</button>
          </Link>
        </div>
      </div>
      <div className="content" data-testid="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
