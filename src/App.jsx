import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import for Redux
import Ecart from './components/Ecart';
import CartPage from './components/CartPage';
import Navbar from './Navbar';
import Wishlist from './components/Wishlist';

function App() {
  const dispatch = useDispatch();
  // get wushlist
  
  // Get wishlist and cart items from Redux store
  const wishlist = useSelector((state) => state.wishlist?.items || []); // Ensure it's always an array
  const cartItems = useSelector((state) => state.cart?.cartItems || []); // Ensure it's always an array

  
  // Placeholder functions for wishlist actions
  const toggleWishlist = (product) => {
    // Define the action to toggle wishlist
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };
  
  const handleAddToCart = (product) => {
    // Define the action to add an item to the cart
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Ecart />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              handleAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
