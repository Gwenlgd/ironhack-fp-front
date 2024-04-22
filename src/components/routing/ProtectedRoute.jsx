import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../context/useAuth";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
