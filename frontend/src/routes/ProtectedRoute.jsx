import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  role,
}) {
  const { auth } = useAuth();

  // belum login
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // cek role (kalau ada)
  if (role && auth.profile?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
