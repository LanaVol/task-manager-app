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
  const isAuth = useSelector((state: any) => state.auth.isLogged);

  const isLoggedIn = () => {
    if (isAuth) {
      return true;
    } else {
      return false;
    }
  };

  return isLoggedIn() ? Component : <Navigate to={redirectTo} />;
};
