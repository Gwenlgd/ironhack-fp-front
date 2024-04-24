import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../context/useAuth";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
