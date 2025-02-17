import Cart from "./Cart";
import { PrimeReactProvider } from "primereact/api";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import AddProducts from "./AddProducts";
import PageNotFound from "./PageNotFound";
function App() {

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
    <PrimeReactProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "98vh", overflow: "hidden", width: "100" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Navbar />
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden", width: "100%" }}>
          {isMobile && (
            <div className="flex items-center" style={{ position: "absolute", top: "1.5rem", left: "1rem", zIndex: 1100, display: "flex", justifyContent: "center" }}>
              <Button
                severity="secondary"
                icon={isSidebarOpen ? "pi pi-times" : "pi pi-align-left"}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-button-text p-button-rounded flex items-center h-16 w-16"

              />
            </div>
          )}
          {(isSidebarOpen || !isMobile) && (
            <div
              style={{
                position: "sticky",
                left: 0,
                top: 0,
                height: "100vh",
                marginTop: "1rem",
                zIndex: 900,
                transition: "all 0.3s ease-in-out",
              }}
            >
              <SideNavbar />
            </div>
          )}

          <div style={{ flex: 1, overflowY: "auto", paddingLeft: isSidebarOpen ? "1rem" : "0", paddingTop: "1rem", paddingBottom: "1rem", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-products" element={<AddProducts />} />
              <Route path="/search-products" element={<Products />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>

        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
