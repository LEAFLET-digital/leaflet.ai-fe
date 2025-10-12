import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../ui";

const ProtectedRoute = ({ children, redirectTo = "/auth" }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loading size="large" />
      </div>
    );
  }

  // If not authenticated, don't render children (redirect will happen via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;