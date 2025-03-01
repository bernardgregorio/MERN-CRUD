import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useLogOutMutation } from "./authApiSlice";
import { logOut } from "./authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogOutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      dispatch(logOut());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="flex flex-row  gap-2 p-2">
      <a
        href="#"
        onClick={handleLogout}
        className="flex items-center space-x-1"
      >
        <span className="font-bold">Logout</span>
        <LogoutIcon fontSize="small" />
      </a>
    </nav>
  );
};

export default Logout;
