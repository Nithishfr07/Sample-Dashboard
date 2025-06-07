
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { state } = useUser();

  useEffect(() => {
    // Redirect based on user state
    if (state.user?.isLoggedIn) {
      if (state.user?.isOnboarded) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [state.user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">SaaS Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Redirecting to your experience...</p>
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  );
};

export default Index;
