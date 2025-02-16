import React, { useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";

export default function Cart() {
  // Sample cart items
  const [cart, setCart] = useState([
    { id: 1, name: "Galaxy Earings", price: 1000, quantity: 1, rating: 4, category: "Electronics", inventoryStatus: "INSTOCK", image: "galaxy-earrings.jpg" },
    { id: 2, name: "Headphones", price: 200, quantity: 2, rating: 5, category: "Audio", inventoryStatus: "LOWSTOCK", image: "headphones.jpg" }
  ]);

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getSeverity = (status) => {
    switch (status) {
      case "INSTOCK": return "success";
      case "LOWSTOCK": return "warning";
      case "OUTOFSTOCK": return "danger";
      default: return null;
    }
  };

  return (
    <div className="card p-4" style={{ maxWidth: "800px", margin: "auto" }}>
      <h2 className="text-2xl font-bold text-center mb-4">Shopping Cart</h2>

      {cart.map((product) => (
        <div key={product.id} className="flex flex-column sm:flex-row align-items-center p-3 mb-3 border-round-lg shadow-sm"
          style={{ border: "1px solid lightgrey", borderRadius: "8px" }}>
          <img className="w-16 sm:w-12rem shadow-2" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />

          <div className="flex flex-column sm:flex-row justify-between align-items-center flex-1 px-4 gap-4">
            <div className="flex flex-column gap-2">
              <div className="text-xl font-semibold">{product.name}</div>
              {/* <Rating value={product.rating} readOnly cancel={false} /> */}
              {/* <span className="font-semibold">{product.category}</span> */}
              {/* <Tag value={product.inventoryStatus} severity={getSeverity(product.inventoryStatus)}></Tag> */}
            </div>

            <div className="flex items-center gap-3">
              <Button icon="pi pi-minus" onClick={() => updateQuantity(product.id, -1)} className="p-button-rounded p-button-outlined" />
              <div className="flex items-center justify-center" style={{
                marginTop: "10px"
              }}>
                <span className="text-xl font-semibold">{product.quantity}</span>
              </div>

              <Button icon="pi pi-plus" onClick={() => updateQuantity(product.id, 1)} className="p-button-rounded" />
            </div>

            <span className="text-xl font-semibold">${product.price * product.quantity}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-between text-xl font-semibold mt-4">
        <span>Total Price:</span>
        <span>${getTotalPrice()}</span>
      </div>

      <Button label="Proceed to Checkout" className="p-button-success w-full mt-3" />
    </div>
  );
}
