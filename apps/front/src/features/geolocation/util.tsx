export function geolocationIconClassName({
  status,
  errorCode,
}: {
  status: string;
  errorCode: number | null;
}) {
  if (status === "waiting" || (status === "error" && errorCode !== 1)) {
    return "fe-geolocation ll-animate flash";
  } else if (status === "error") {
    return "fe-locate-off";
  }
  return "";
}
