import { Outlet } from "react-router";
import SideNavbar from "../components/SideNavbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProtectedRoute from "../apiContext/ProtectedRoute";

const theme = createTheme({
  palette: {
    background: {
      default: "#e2e2e2ff",
      paper: "#e2e2e2ff",
    },
    text: {
      primary: "#000000ff",
    },
  },
});

function DashboardLayout() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "black" }}>
        <main className="bg-black h-[calc(100vh-11.5vh)]">
          <Outlet />
        </main>
        <div className="gradient-bg hidden md:block">
          <SideNavbar />
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
