
import { useState } from "react";
import Dashboardheader from "./Dashboardheader";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [compactView, setCompactView] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <Dashboardheader />

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-400">
          Customize your MobileFix admin experience
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">General Settings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage dashboard preferences
          </p>

          <label className="mt-6 flex items-center justify-between gap-4">
            <span>
              <span className="block font-medium">Notifications</span>
              <span className="text-sm text-slate-400">
                Enable booking notification preference
              </span>
            </span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-5 w-5 accent-cyan-500"
            />
          </label>

          <label className="mt-6 flex items-center justify-between gap-4">
            <span>
              <span className="block font-medium">Compact View</span>
              <span className="text-sm text-slate-400">
                Dashboard display preference
              </span>
            </span>
            <input
              type="checkbox"
              checked={compactView}
              onChange={(e) => setCompactView(e.target.checked)}
              className="h-5 w-5 accent-cyan-500"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Application</h2>
          <p className="mt-3 text-slate-400">MobileFix Admin Panel</p>
          <p className="mt-1 text-sm text-slate-500">
            Settings currently apply only to this page session.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Settings;
