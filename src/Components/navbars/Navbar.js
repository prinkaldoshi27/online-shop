
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, userName  }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userName");
        navigate("/signin");
    };
    const start = (
        <div className="flex items-center gap-4">
            <Button icon="pi pi-bars" className="p-button-text"
                onClick={() => setIsSidebarOpen(prev => !prev)} />  
            <h2 className="text-lg md:text-2xl">TAG ECOMMERCE</h2>
        </div>
    );

    const end = (
        <div className="flex items-center gap-4 h-full">
            <Button icon="pi pi-user" shape="circle" label={userName} severity="success" text onClick={() => navigate("/dashboard")} />
            <Button label="Logout" onClick={handleLogout} className="p-button-danger" />
        </div>
    );


    return (
        <div className="card">
            <Menubar start={start} end={<div className="flex items-center h-full">{end}</div>} model={[]} />
        </div>
    );

}

export default Navbar;