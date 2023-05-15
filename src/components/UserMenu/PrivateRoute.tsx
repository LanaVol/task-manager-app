import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: PrivateRouteProps) => {
  const isLoggesIn = () => {
    if (localStorage.getItem("token")) {
      console.log("yes");
      return true;
    } else {
      console.log("no");
      return false;
    }
  };

  return isLoggesIn() ? Component : <Navigate to={redirectTo} />;
};
