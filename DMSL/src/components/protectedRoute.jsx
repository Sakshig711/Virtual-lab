import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
// const token=sessionStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
