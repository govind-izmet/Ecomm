const initialState = {
  items: [], // Initialize as an empty array
};

// Helper function to toggle items in wishlist
const toggleItemInWishlist = (items, item) => {
  const itemExists = items.find((wishlistItem) => wishlistItem.id === item.id);
  
  if (itemExists) {
    // Remove the item if it already exists in the wishlist
    return items.filter((wishlistItem) => wishlistItem.id !== item.id);
  } else {
    // Add the item if it's not in the wishlist
    return [...items, item];
  }
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        items: toggleItemInWishlist(state.items, action.payload),
      };
    default:
      return state;
  }
};

export default wishlistReducer;
