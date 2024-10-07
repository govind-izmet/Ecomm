import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // To access cart and wishlist state

function Navbar() {
  const navigate = useNavigate();

  // Ensure cartItems and wishlist are arrays
  const cartItems = useSelector((state) => state.cart.cartItems || []); // Default to empty array if undefined
  const wishlist = useSelector((state) => state.wishlist.items || []); // Default to empty array if undefined

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          E-Shop
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Cart Icon */}
            <li className="nav-item">
              <button
                className="btn btn-primary position-relative me-3"
                onClick={() => handleNavigate('/cart')}
              >
                <FaShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </li>

            {/* Wishlist Icon */}
            <li className="nav-item">
              <button
                className="btn btn-danger position-relative"
                onClick={() => handleNavigate('/wishlist')}
              >
                <FaHeart size={24} />
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
