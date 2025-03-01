import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const RequireAuth = () => {
  const location = useLocation();
  const [auth] = useLocalStorage("auth", "");
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
