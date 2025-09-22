import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function HomeLayout() {
  return (
    <div className="min-h-screen">
      {/* Fixed Navbar at Top */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: '64px' }}>
        <Navbar />
      </div>
      
      {/* Main Content - with top padding for navbar */}
      <main style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>

    </div>
  );
}
