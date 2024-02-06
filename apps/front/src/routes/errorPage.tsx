import { ErrorResponse, useRouteError } from "react-router-dom";
import "./errorPage.scss";

type UnknownError = ErrorResponse | Error;

export default function ErrorPage() {
  const error = useRouteError() as UnknownError;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as ErrorResponse).statusText || (error as Error).message}</i>
      </p>
    </div>
  );
}
