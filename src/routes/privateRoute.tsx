import { Navigate } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const { children } = props;
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }

  return children;
};

export default PrivateRoute;
