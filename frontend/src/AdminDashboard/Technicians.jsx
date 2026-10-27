
import Dashboardheader from "./Dashboardheader";

const Technicians = () => {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <Dashboardheader />

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold">Technicians</h1>
        <p className="mt-2 text-slate-400">
          Manage repair technicians and their availability
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Technician Management</h2>
            <p className="mt-2 text-slate-400">
              Add and manage technicians as this module is connected.
            </p>
          </div>
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
            Setup pending
          </span>
        </div>
      </div>
    </main>
  );
};

export default Technicians;
