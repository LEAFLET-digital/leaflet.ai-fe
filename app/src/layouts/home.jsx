import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div>
      <main className="flex flex-col min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
