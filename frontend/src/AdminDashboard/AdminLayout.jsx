
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-slate-950">
      <Sidebar />

      <main className="min-h-screen min-w-0 w-full md:ml-72 md:w-[calc(100%-18rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
