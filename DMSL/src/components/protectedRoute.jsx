import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("adminData");
// const token=sessionStorage.getItem("token");
  return token ? element : <Navigate to="/adminlogin" />;
};

export default ProtectedRoute;
