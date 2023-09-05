import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PublicRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PublicRoute = ({
  component: Component,
  redirectTo = "/",
}: PublicRouteProps) => {
  const isAuth = useSelector((state: any) => state.auth.isLogged);

  return isAuth ? <Navigate to={redirectTo} /> : Component;
};
