import React from 'react';
import { useCart } from './context/CartContext';  // Custom hook to access cart context
import './Cart.css';

const Cart = () => {
  // Access cart-related functions and data from the CartContext
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handler for removing an item from the cart by its ID
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      
      {/* Check if cart is empty and display a message if so */}
      {cartItems.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty. <a href="/categories">Browse our collection!</a>
        </p>
      ) : (
        <>
          {/* List of cart items */}
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li className="cart-item" key={item.id}>
                {/* Display item image */}
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p><strong>Author:</strong> {item.author}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <p><strong>Subtotal:</strong> ₹{item.price * item.quantity}</p>
                  
                  {/* Quantity controls for increasing or decreasing item quantity */}
                  <div className="cart-quantity">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  
                  {/* Remove button to delete item from cart */}
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart summary section to show the total price */}
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
