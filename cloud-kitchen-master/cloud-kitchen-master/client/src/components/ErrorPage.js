import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <h1>Something Went Wrong... :(</h1>
      <h2>{error && error.status && error.status + ": " + error.statusText}</h2>
      <p>{error && error.data && error.data.message}</p>
    </>
  );
};

export default ErrorPage;
