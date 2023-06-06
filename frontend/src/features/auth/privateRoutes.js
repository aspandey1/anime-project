import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return user != null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
