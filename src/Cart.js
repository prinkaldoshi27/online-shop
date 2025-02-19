import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from './features/CartSlice';
import { Toast } from 'primereact/toast';

export default function Cart() {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems || [];

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const incQuantity = (id, quantity) => {
    const item = cartItems.find(cart => cart.id === id);
    if (item && item.cartQuantity < quantity) {
      dispatch(increaseQuantity(id));
      showToast('success', 'Product Added', 'Product added successfully');
    }
  };

  const decQuantity = (id) => {
    const item = cartItems.find(cart => cart.id === id);
    if (item) {
      if (item.cartQuantity > 1) {
        dispatch(decreaseQuantity(id));
        showToast('info', 'Product Removed', 'Product removed successfully');
      } else {
        dispatch(removeFromCart(id));
        showToast('error', 'Product Removed', 'Product removed from cart');
      }
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast('warn', 'Cart Cleared', 'Your cart has been emptied');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.cartQuantity, 0).toFixed(2);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="card p-4" style={{ maxWidth: "800px", margin: "auto" }}>
        <h2 className="text-2xl font-bold text-center mb-4">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-lg">Your cart is empty.</div>
        ) : (
          cartItems.map((product) => (
            <div key={product.id} className="flex flex-column sm:flex-row align-items-center p-3 mb-3 border-round-lg shadow-sm"
              style={{ border: "1px solid lightgrey", borderRadius: "8px" }}>
              <img className="w-16 sm:w-12rem shadow-2" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
              <div className="flex flex-column sm:flex-row justify-between align-items-center flex-1 px-4 gap-4 w-full">
                <div className="flex flex-column gap-2 flex-grow-1">
                  <div className="text-xl font-semibold">{product.name}</div>
                </div>
                <div className="flex flex-col items-center justify-center h-full gap-2">

                  <Button
                    icon="pi pi-minus"
                    onClick={() => decQuantity(product.id)}
                    className="p-button-rounded p-button-outlined"
                  />
                  <span className="text-xl font-semibold" style={{
                    paddingTop: "0.5rem",

                  }}>{product.cartQuantity}</span>
                  <Button
                    icon="pi pi-plus"
                    onClick={() => incQuantity(product.id, product.quantity)}
                    className="p-button-rounded"
                    disabled={product.cartQuantity >= product.quantity}
                  />
                </div>

                <span className="text-xl font-semibold">${(product.price * product.cartQuantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between text-xl font-semibold mt-4">
              <span>Total Price:</span>
              <span>${getTotalPrice()}</span>
            </div>

            <div className="flex gap-3 mt-3">
              <Button label="Proceed to Checkout" className="p-button-success w-full" />
              <Button label="Clear Cart" className="p-button-danger w-full" onClick={handleClearCart} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
