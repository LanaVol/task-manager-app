import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: PrivateRouteProps) => {
  console.log(redirectTo);
  const isAuth = useSelector((state: any) => state.auth.isLogged);

  return isAuth ? Component : <Navigate to={redirectTo} />;
};
