import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto p-6 md:p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;