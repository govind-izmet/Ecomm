import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

export default function Wishlist({ wishlist, toggleWishlist, handleAddToCart, cartItems }) {
  const navigate = useNavigate();

  // Get the quantity of a product from the cart
  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Navigate to the cart page
  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Wishlist</h1>

      <div className="row">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card shadow-sm position-relative">
                {/* Toggle Wishlist */}
                <FaHeart
                  className={`position-absolute top-0 end-0 m-2 ${
                    wishlist.some((item) => item.id === product.id)
                      ? 'text-danger' // Red if item is in wishlist
                      : 'text-secondary' // Grey if item is not in wishlist
                  }`}
                  size={24}
                  onClick={() => toggleWishlist(product)} // Toggle the wishlist state for this product
                  style={{ cursor: 'pointer' }}
                />
                
                {/* Product Image */}
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                
                {/* Product Details */}
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <p className="card-text">${product.price}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    {/* Quantity in Cart */}
                    <span className="quantity-display">
                      {getProductQuantity(product.id)} in cart
                    </span>

                    {/* Add to Cart Button */}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                      disabled={getProductQuantity(product.id) > 0} // Disable if product is already in the cart
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products in the wishlist yet.</p>
        )}
      </div>

      <style jsx>{`
        .card {
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .card-body {
          padding: 15px;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #343a40;
        }

        .btn-primary {
          background-color: #007bff;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .text-danger {
          color: #dc3545 !important;
        }

        .text-secondary {
          color: #6c757d !important;
        }
      `}</style>
    </div>
  );
}
