import { createContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token, getAuthHeaders } = useAuth();
  const fetchCart = useCallback(() => {
    if (!token) return Promise.resolve([]);
    // fetch cart items (cartitems endpoint returns user-scoped items)
    return fetch('http://127.0.0.1:8000/cartitems/', {
      headers: getAuthHeaders(),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        setCartItems(data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        throw error;
      });
  }, [token, getAuthHeaders]);

  useEffect(() => {
    if (!token) {
      setCartItems([]);
      return;
    }
    fetchCart().catch(() => {});
  }, [token, fetchCart]);

  // ...


  const addToCart = useCallback((product, quantity = 1, category) => {
    if (!token) return Promise.reject(new Error('Not authenticated'));
    // POST to cartitems endpoint (backend expects product_id, category, quantity)
    return fetch('http://127.0.0.1:8000/cartitems/', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: product.id, quantity, category }),
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then(result => {
        return fetchCart(); // Re-fetch the entire cart to ensure UI is in sync with backend
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        // Optional: Re-fetch to sync state if API call fails
        return fetchCart().catch(() => {}).then(() => { throw error; });
    });
  }, [token, getAuthHeaders, fetchCart]);
  const increaseCartQuantity = useCallback((cartItemId) => {
    if (!token) return Promise.reject(new Error('Not authenticated'));
    const item = cartItems.find((item) => item.id === cartItemId);
    if (!item) return Promise.resolve();
    const newQuantity = item.quantity + 1;

    // Update the cart item on cartitems endpoint
    return fetch(`http://127.0.0.1:8000/cartitems/${cartItemId}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity: newQuantity }),
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res.json();
    })
    .then(() => fetchCart())
    .catch(error => {
      console.error('Error increasing quantity:', error);
      return fetchCart().catch(() => {}).then(() => { throw error; });
    });
  }, [token, getAuthHeaders, cartItems, fetchCart]);

  const removeCompletelyFromCart = useCallback((cartId) => {
    if (!token) return Promise.reject(new Error('Not authenticated'));
    // Delete the specific cart item
    return fetch(`http://127.0.0.1:8000/cartitems/${cartId}/`, {
      method: 'DELETE',
      headers: getAuthHeaders({ json: false }),
    })
    .then(() => fetchCart())
    .catch(error => {
      console.error('Error removing from cart:', error);
      return fetchCart().catch(() => {}).then(() => { throw error; });
    });
  }, [token, getAuthHeaders, fetchCart]);

  const decreaseCartQuantity = useCallback((cartItemId) => {
    if (!token) return Promise.reject(new Error('Not authenticated'));
    const item = cartItems.find((item) => item.id === cartItemId);
    if (!item) return Promise.resolve();

    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;

      return fetch(`http://127.0.0.1:8000/cartitems/${cartItemId}/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity: newQuantity }),
      })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(() => fetchCart())
      .catch(error => {
        console.error('Error decreasing quantity:', error);
        return fetchCart().catch(() => {}).then(() => { throw error; });
      });
    } else {
      return removeCompletelyFromCart(cartItemId);
    }
  }, [token, getAuthHeaders, cartItems, fetchCart, removeCompletelyFromCart]);

  const clearCart = () => {
    if (!token) return;
    // Optimistically update UI
    // The backend clears the cart items when an order is placed.
    // We just need to clear the local state.
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCompletelyFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;