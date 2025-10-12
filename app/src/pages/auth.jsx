import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LoginForm, SignupForm } from "../components/auth";
import { useState } from "react";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.user_id}`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSuccess = () => {
    if (user) {
      navigate(`/dashboard/${user.user_id}`, { replace: true });
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md">
        {mode === "login" ? (
          <LoginForm 
            onSuccess={handleSuccess} 
            onSwitchToSignup={switchMode}
            className="w-full"
          />
        ) : (
          <SignupForm 
            onSuccess={handleSuccess} 
            onSwitchToLogin={switchMode}
            className="w-full"
          />
        )}
        
        {/* Back to home link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;