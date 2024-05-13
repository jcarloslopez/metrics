import "./error.css";

import { useRouteError } from "react-router-dom";

const Error: React.FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
