import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    console.log(sidebarOpen);

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                isSidebarOpen={sidebarOpen} // Pass state down
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
