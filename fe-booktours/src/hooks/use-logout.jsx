import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalProvider";

const useLogout = () => {

  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  const logout = () => {
    context.setIsAuthenticated(false);
    context.setRoles([]);
    context.setProfile({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  return logout;
};

export default useLogout;
