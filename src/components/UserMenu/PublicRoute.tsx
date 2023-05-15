import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PublicRoute = ({
  component: Component,
  redirectTo = "/",
}: PublicRouteProps) => {
  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      console.log("yes");
      return true;
    } else {
      console.log("no");
      return false;
    }
  };

  return isLoggedIn() ? <Navigate to={redirectTo} /> : Component;
};
