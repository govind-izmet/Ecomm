import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import heart icon
import { addToCart, updateQuantity, removeFromCart } from '../features/counter/cartSlice'; // Import remove action

export default function Ecart() {
  const [fetchedData, setFetchedData] = useState([]);
  const [wishlist, setWishlist] = useState([]); // State for wishlist
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // Select cart items from Redux
  const navigate = useNavigate();

  // Fetching data from API
  const fetchingData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setFetchedData(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // Get the quantity of a product from the cart
  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle quantity change
  const handleQuantityChange = (product, change) => {
    const currentQuantity = getProductQuantity(product.id);
    const newQuantity = currentQuantity + change;

    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity })); // Update quantity if greater than 0
    } else if (newQuantity === 0) {
      dispatch(removeFromCart(product.id)); // Remove from cart when quantity is 0
    }
  };

  // Add to cart logic
  const handleAddToCart = (product) => {
    const quantity = getProductQuantity(product.id);
    if (quantity === 0) {
      dispatch(addToCart({ ...product, quantity: 1 })); // Add product if not in the cart
    }
  };

  // Wishlist management: Toggle wishlist item
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id)); // Remove from wishlist if already added
    } else {
      setWishlist([...wishlist, product]); // Add to wishlist
    }
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate('/cart');
  };

  // Calculate total items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Side Links */}
        <div className="col-md-2">
        
        </div>

        {/* Main Content (EKart Products) */}
        <div className="col-md-10">
          <div className="d-flex justify-content-end mb-4">
            
          </div><br /><br />

          <h2 className="text-center mb-4">Sample E-Commerce</h2>
          <div className="row">
            {fetchedData.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card shadow-sm position-relative">
                  {/* Favorite Icon */}
                  <FaHeart
                    className={`position-absolute top-0 end-0 m-2 ${isInWishlist(product.id) ? 'text-danger' : 'text-secondary'}`} // Change color based on wishlist state
                    size={24}
                    onClick={() => toggleWishlist(product)} // Toggle wishlist on click
                    style={{ cursor: 'pointer' }}
                  />
                  <img
                    src={product.thumbnail}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-danger me-2"
                          onClick={() => handleQuantityChange(product, -1)}
                          disabled={getProductQuantity(product.id) <= 0} // Disable if quantity is 0
                        >
                          -
                        </button>
                        <span className="quantity-display">
                          {getProductQuantity(product.id)} {/* Show cart quantity */}
                        </span>
                        <button
                          className="btn btn-outline-success ms-2"
                          onClick={() => handleQuantityChange(product, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product)}
                        disabled={getProductQuantity(product.id) > 0} // Disable if already in cart
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .left-space {
          background-color: #f8f9fa;
          border-radius: 8px;
        }

        .left-space h5 {
          margin-bottom: 15px;
        }

        .left-space a {
          text-decoration: none;
          color: #007bff;
          font-size: 1rem;
        }

        .left-space a:hover {
          color: #0056b3;
          text-decoration: underline;
        }

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

        .quantity-display {
          width: 30px;
          text-align: center;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .btn-outline-danger {
          color: #dc3545;
          border-color: #dc3545;
        }

        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: #fff;
        }

        .btn-outline-success {
          color: #28a745;
          border-color: #28a745;
        }

        .btn-outline-success:hover {
          background-color: #28a745;
          color: #fff;
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
