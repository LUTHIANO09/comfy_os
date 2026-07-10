import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;