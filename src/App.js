import { Routes, Route } from 'react-router-dom';
// Importing components for different pages and sections
import Home from './Home';
import Categories from './Categories';
import Book from './Book';
import Header from './Header';
import Footer from './Footer';
import Missing from './Missing'; // Component for handling undefined routes
import Contact from './Contact';
import './App.css'; // Importing styling for the App component
import Account from './Account';
import Register from './Register';
import Login from './Login';
import { CartProvider } from './context/CartContext'; // Importing the CartProvider to manage cart context across the app
import Cart from './Cart';
import { useEffect, useState } from 'react';
import { auth } from './firebase'; // Firebase configuration import for authentication
import { onAuthStateChanged } from 'firebase/auth'; // Firebase function to monitor auth state changes

function App() {
  // State to store the current user's authentication status
  const [user, setUser] = useState(null);
  console.log(user);
  // useEffect hook to monitor changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If a user is signed in, update the state with the user's info
        setUser(user);
      } else {
        // If no user is signed in, set user state to null
        setUser(null);
      }
    });

    // Cleanup function to unsubscribe from the auth listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    // Wrapping the app inside CartProvider to allow all components to access cart context
    <CartProvider>
      <div className="app-container">
        <Header /> {/* Header component displays navigation options */}
        <main className="main-content">
          <Routes>
            {/* Defining routes for different pages */}
            <Route path="/" element={<Home />} /> {/* Home page route */}
            <Route path="/categories">
              <Route index element={<Categories />} /> {/* Categories page */}
              <Route path="book/:bookId" element={<Book />} /> {/* Book details page, dynamic route for specific book */}
            </Route>
            <Route path="contact" element={<Contact />} /> {/* Contact page route */}
            <Route path="/account" element={<Account />} /> {/* Account page route */}
            <Route path="/register" element={<Register />} /> {/* Registration page route */}
            <Route path="/login" element={<Login />} /> {/* Login page route */}
            <Route path="/cart" element={<Cart />} /> {/* Cart page route */}
            <Route path="*" element={<Missing />} /> {/* Route for handling undefined pages (404) */}
          </Routes>
        </main>
        <Footer /> {/* Footer component for the bottom of the page */}
      </div>
    </CartProvider>
  );
}

export default App;
