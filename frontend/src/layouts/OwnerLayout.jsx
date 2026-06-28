import OwnerSidebar from "../components/owner/OwnerSidebar";
import OwnerHeader from "../components/owner/OwnerHeader";
import { Outlet } from "react-router-dom";

export default function OwnerLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="flex flex-row flex-1 bg-[#181818]">
        <OwnerSidebar />
        <div className="flex-1 flex flex-col">
          <OwnerHeader />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}