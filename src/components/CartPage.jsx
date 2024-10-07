import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { removeFromCart, updateQuantity } from '../features/counter/cartSlice'; // Import actions

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // Select cart items from Redux

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity })); // Dispatch update quantity action
    } else {
      handleRemove(id); // Remove item if quantity is 0
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id)); // Dispatch remove from cart action
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Your Cart</h1>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100" style={{ width: '300px', height: '450px' }}>
              <img
                src={item.thumbnail}
                className="card-img-top"
                alt={item.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <div className="mt-auto"> {/* Ensures buttons are at the bottom */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="quantity-control d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-12 text-right">
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
          <button className="btn btn-success btn-lg">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
