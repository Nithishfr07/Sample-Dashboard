
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { UserProvider, useUser } from "./context/UserContext";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useUser();
  
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!state.user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Onboarding Route component
const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useUser();
  
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!state.user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (state.user?.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Dashboard Route component
const DashboardRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useUser();
  
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!state.user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!state.user?.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { state } = useUser();

  return (
    <Routes>
      {/* Default route */}
      <Route 
        path="/" 
        element={
          state.user?.isLoggedIn 
            ? state.user?.isOnboarded 
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/onboarding" replace />
            : <Navigate to="/login" replace />
        } 
      />
      
      {/* Login route */}
      <Route path="/login" element={<Login />} />
      
      {/* Onboarding route */}
      <Route 
        path="/onboarding" 
        element={
          <OnboardingRoute>
            <Onboarding />
          </OnboardingRoute>
        } 
      />
      
      {/* Dashboard route */}
      <Route 
        path="/dashboard" 
        element={
          <DashboardRoute>
            <Dashboard />
          </DashboardRoute>
        } 
      />
      
      {/* Fallback routes */}
      <Route path="/index" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TooltipProvider>
            <AppRoutes />
            <Toaster />
            <Sonner />
            <HotToaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'rgb(30 41 59)',
                  color: 'white',
                  borderRadius: '12px',
                  border: '1px solid rgb(51 65 85)',
                },
              }}
            />
          </TooltipProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
