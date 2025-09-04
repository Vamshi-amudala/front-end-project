import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();

  console.log("ProtectedRoute check:", { user, role, allowedRoles }); // 👈

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
