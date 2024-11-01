import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../firebase'; // Import Firestore and Auth services

// Create a Context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap around parts of the app that need cart access
export const CartProvider = ({ children }) => {
  // State to hold cart items and user information
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user data from Firestore if user is authenticated
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ ...userDoc.data(), uid: currentUser.uid }); // Set user state
          fetchCartItems(currentUser.uid); // Fetch cart items for the user
        }
      } else {
        // Reset user and cart items if not authenticated
        setUser(null);
        setCartItems([]);
      }
    });
    return unsubscribe; // Clean up subscription on unmount
  }, []);

  // Function to fetch cart items for the authenticated user from Firestore
  const fetchCartItems = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCartItems(docSnap.data().cartItems || []); // Set cart items from Firestore
    } else {
      console.log("No such document!"); // Handle case where no document is found
    }
  };

  // Function to save cart items to Firestore, memoized with useCallback
  const saveCartItems = useCallback(async (userId) => {
    await setDoc(doc(db, 'users', userId), { cartItems }, { merge: true }); // Save cart items, merging with existing data
  }, [cartItems]); // Depend on cartItems to ensure latest state is saved

  // Function to add a new item to the cart or increase its quantity
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === newItem.id);
      if (itemExists) {
        // Increase quantity if item already exists in the cart
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId)); // Filter out the item to be removed
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease the quantity of an item in the cart or remove it if it reaches zero
  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map(item =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // Effect to fetch cart items when the user logs in
  useEffect(() => {
    const user = auth.currentUser; // Get the current authenticated user
    if (user) {
      fetchCartItems(user.uid); // Fetch cart items if user exists
    }
  }, []); // Runs only on mount

  // Effect to save cart items when they change
  useEffect(() => {
    const user = auth.currentUser; // Get the current authenticated user
    if (user) {
      saveCartItems(user.uid); // Save cart items if user exists
    }
  }, [cartItems, saveCartItems]); // Include saveCartItems in the dependency array

  return (
    <CartContext.Provider value={{ cartItems, addToCart, user, setCartItems, removeFromCart, increaseQuantity, decreaseQuantity }}>
      {children} {/* Provide context to child components */}
    </CartContext.Provider>
  );
};
