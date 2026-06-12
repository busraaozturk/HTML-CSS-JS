import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((prev) => !prev)} />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar collapsed={collapsed} />

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
