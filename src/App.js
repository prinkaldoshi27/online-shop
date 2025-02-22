import React, { useState, useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import Navbar from "./Components/navbars/Navbar";
import SideNavbar from "./Components/navbars/SideNavbar";
import Products from "./Components/Products/Products";
import Cart from "./Components/Products/Cart";
import AddProducts from "./Components/Products/AddProducts";
import PageNotFound from "./Components/PageNotFound";
import Signin from "./Components/auth/Signin";
import Register from "./Components/auth/Register";
import Users from "./Components/Users/Users";

function App() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <PrimeReactProvider>
        <Routes>
          <Route path="/signin" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/signin" />} /> 
          <Route path="/users" element={<Users />} />
        </Routes>
      </PrimeReactProvider>
    );
  }

  return (
    <PrimeReactProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "98vh", overflow: "hidden", width: "100%" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Navbar userName={users?.name} />
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden", width: "100%" }}>
          {isMobile && (
            <div className="flex items-center" style={{ position: "absolute", top: "1.5rem", left: "1rem", zIndex: 1100 }}>
              <Button
                severity="secondary"
                icon={isSidebarOpen ? "pi pi-times" : "pi pi-align-left"}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-button-text p-button-rounded flex items-center h-16 w-16"
              />
            </div>
          )}
          {(isSidebarOpen || !isMobile) && (
            <div style={{ position: "sticky", left: 0, top: 0, height: "100vh", marginTop: "1rem", zIndex: 900, transition: "all 0.3s ease-in-out" }}>
              <SideNavbar />
            </div>
          )}

          <div style={{ flex: 1, overflowY: "auto", paddingLeft: isSidebarOpen ? "1rem" : "0", paddingTop: "1rem", paddingBottom: "1rem", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-products" element={<AddProducts />} />
              <Route path="/users" element={<Users />}></Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
