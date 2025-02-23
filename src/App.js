import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import Products from "./Components/Products/Products";
import Cart from "./Components/Products/Cart";
import AddProducts from "./Components/Products/AddProducts";
import Users from "./Components/Users/Users";
import PageNotFound from "./Components/PageNotFound";
import Signin from "./Components/auth/Signin";
import Register from "./Components/auth/Register";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, [location]);

  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    navigate("/products");
  };

  return (
    <PrimeReactProvider>
      <Routes>
        {/* Public Routes (No Navbar) */}
        <Route path="/" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signin" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (With Navbar & Sidebar) */}
        {isAuthenticated ? (
          <Route path="/" element={<Layout />}>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        ) : (
          <Route path="*" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
