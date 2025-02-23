import { useState, useEffect } from "react";
import Navbar from "./navbars/Navbar";
import SideNavbar from './navbars/SideNavbar'
import { Outlet } from "react-router-dom";

const Layout = ({ userName }) => {  // Accept userName as a prop
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 1024);
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
            {/* Top Navbar */}
            <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <Navbar userName={userName} /> {/* Pass userName here */}
            </div>

            <div style={{ display: "flex", flex: 1, overflow: "hidden", width: "100%" }}>
                {/* Sidebar for Larger Screens */}
                {(isSidebarOpen || !isMobile) && (
                    <div style={{ position: "sticky", left: 0, top: 0, height: "100vh", marginTop: "1rem", zIndex: 900 }}>
                        <SideNavbar />
                    </div>
                )}

                {/* Page Content */}
                <div style={{ flex: 1, overflowY: "auto", padding: "1rem", width: "100%" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
