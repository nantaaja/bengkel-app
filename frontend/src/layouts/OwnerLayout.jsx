import { useState } from "react";
import OwnerSidebar from "../components/owner/OwnerSidebar";
import OwnerHeader from "../components/owner/OwnerHeader";
import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#181818]">
      <OwnerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0">
        <OwnerHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 p-3 sm:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}