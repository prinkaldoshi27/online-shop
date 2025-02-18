import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from './features/CartSlice';
import { Toast } from 'primereact/toast';

export default function Cart() {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems || [];

  const showIncrease = () => {
    toast.current.show({ severity: 'success', summary: 'Product Adding', detail: 'Product Added Successfully', life: 3000 });
  };

  const showDecrease = () => {
    toast.current.show({ severity: 'info', summary: 'Product Removing', detail: 'Product Removed Successfully', life: 3000 });
  };

  const showRemove = () => {
    toast.current.show({ severity: 'error', summary: 'Product Removing', detail: 'Product Removed from the Cart Successfully', life: 3000 });
  };

  const incQuantity = (id) => {
    dispatch(increaseQuantity(id));
    showIncrease();
  };

  const decQuantity = (id) => {
    const item = cartItems.find((cart) => cart.id === id);
    if (item) {
      if (item.cartQuantity > 1) {
        dispatch(decreaseQuantity(id));
        showDecrease();
      } else {
        dispatch(removeFromCart(id));
        showRemove();
      }
    }
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
              <div className="flex flex-column sm:flex-row justify-between align-items-center flex-1 px-4 gap-4">
                <div className="flex flex-column gap-2">
                  <div className="text-xl font-semibold">{product.name}</div>
                </div>

                <div className="flex items-center gap-3">
                  <Button icon="pi pi-minus" onClick={() => decQuantity(product.id)} className="p-button-rounded p-button-outlined" />
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-xl font-semibold">{product.cartQuantity}</span>
                  </div>
                  <Button icon="pi pi-plus" onClick={() => incQuantity(product.id)} className="p-button-rounded" />
                </div>

                <span className="text-xl font-semibold">${(product.price * product.cartQuantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        )}

        <div className="flex justify-between text-xl font-semibold mt-4">
          <span>Total Price:</span>
          <span>${getTotalPrice()}</span>
        </div>

        {cartItems.length > 0 && (
          <Button label="Proceed to Checkout" className="p-button-success w-full mt-3" />
        )}
      </div>
    </>
  );
}
