import { Outlet, useNavigate, useLocation } from "react-router";
import SideNavbar from "../components/SideNavbar";
import Navbar from "../components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ProtectedRoute } from "../components/auth";
import { useAuth } from "../context/AuthContext";

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#0c0c0c",
      paper: "rgba(15, 23, 42, 0.95)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(156, 163, 175, 1)",
    },
    primary: {
      main: "#3b82f6",
    },
  },
});

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const userId = user ? user.user_id : null;

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-full overflow-hidden">
        {/* Fixed Navbar at Top */}
        <div className="fixed top-0 left-0 right-0 z-50" style={{ height: '100px' }}>
          <Navbar />
        </div>
        
        {/* Main Content Area - Below Navbar */}
        <div className="flex h-full" style={{ paddingTop: '100px' }}>
          {/* Fixed Side Navbar on Left */}
          <div className="flex-shrink-0" style={{ width: '200px' }}>
            <div className="h-full overflow-hidden">
              <SideNavbar 
                navigate={navigate} 
                location={location} 
                userId={userId} 
              />
            </div>
          </div>
          
          {/* Scrollable Main Content Area */}
          <main className="flex-1 h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  );
}
