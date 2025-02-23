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
import Navbar from "./Components/navbars/Navbar";
import Profile from "./Components/auth/Profile";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUsers] = useState(null)

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedUserName = localStorage.getItem("userName");

    setIsAuthenticated(authStatus);
    setUserName(storedUserName || "");
  }, [location]);

  const handleLoginSuccess = (user) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", user.name); 
    setIsAuthenticated(true);
    setUserName(user.name);
    setUsers(user)
    console.log("YAHA HAI? ", user)
    navigate("/products");
  };

  console.log("KYA NAI HAI USERS? ", user)

  return (
    <PrimeReactProvider>

      <Routes>
        <Route path="/" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signin" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />

        {isAuthenticated ? (
          <Route path="/" element={<Layout userName={userName} />}>
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile user={user}/>} />
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
