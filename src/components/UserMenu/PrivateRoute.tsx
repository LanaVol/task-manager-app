import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: PrivateRouteProps) => {
  const isLoggesIn = false;
  return isLoggesIn ? Component : <Navigate to={redirectTo} />;
};
