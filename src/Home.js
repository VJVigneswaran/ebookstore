import React, { useEffect, useState } from "react";
import "./Home.css"; // Importing CSS for styling the Home component
import { Link, useNavigate } from "react-router-dom"; // Importing routing components
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "./firebase"; // Importing the Firestore database configuration
import { useCart } from './context/CartContext'; // Importing the CartContext to manage cart actions

// Main Home component
const Home = () => {
  const { addToCart } = useCart(); // Accessing the addToCart function from the CartContext
  const [featuredBooks, setFeaturedBooks] = useState([]); // State to store the list of featured books
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Function to fetch featured books from Firestore
  const getFeaturedBooks = async () => {
    const colRef = collection(db, "books"); // Reference to the "books" collection
    const querySnapshot = await getDocs(colRef); // Fetching documents from the collection
    let fetchedBooks = [];
    querySnapshot.forEach((doc) => {
      fetchedBooks.push({ id: doc.id, ...doc.data() }); // Adding each book document to the array
    });
    setFeaturedBooks(fetchedBooks); // Updating the featuredBooks state with fetched data
  };

  // useEffect to load the featured books on component mount
  useEffect(() => {
    getFeaturedBooks(); // Calling the fetch function when the component mounts
  }, []);

  // Handle book click to navigate to the book's detail page
  const handleBookClick = (bookId) => {
    navigate(`/categories/book/${bookId}`); // Navigates to the book's detail route based on its ID
  };

  // Handle add to cart function and show an alert
  const handleAddToCart = (book) => {
    addToCart(book); // Adding the selected book to the cart
    alert(`${book.title} has been added to your cart!`); // Alert message for feedback
  };

  return (
    <main>
      {/* Section for featured eBooks */}
      <section className="featured-ebooks">
        <h2>Featured eBooks</h2>
        <div className="ebook-list">
          {/* Rendering each book item */}
          {featuredBooks.map((book) => (
            <div className="ebook-item" key={book.id}>
              <img
                src={book.img}
                alt={book.title}
                loading="lazy"
                onClick={() => handleBookClick(book.id)} // Click event to view book details
              />
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Category:</strong> {book.category}
              </p>
              <p>
                <strong>Price:</strong> ₹{book.price}
              </p>
              <button onClick={() => handleAddToCart(book)}>Add to Cart</button> {/* Add to cart button */}
            </div>
          ))}
        </div>
      </section>

      {/* Section for browsing by categories */}
      <section className="categories">
        <h2 className="categories-title">Browse By Category</h2>
        <div className="category-list">
          {/* Rendering each category with a background image and link */}
          <div
            id="mystery-category"
            className="category-item"
            style={{ backgroundImage: "url('/CategoryImages/Mystery.jpg')" }}
          >
            <Link to="/categories?category=Mystery">Mystery</Link>
          </div>
          <div
            id="fiction-category"
            className="category-item"
            style={{ backgroundImage: "url('/CategoryImages/fiction.jpg')" }}
          >
            <Link to="/categories?category=Fiction">Fiction</Link>
          </div>
          <div
            id="nonfiction-category"
            className="category-item"
            style={{ backgroundImage: "url('/CategoryImages/nonfiction.webp')" }}
          >
            <Link to="/categories?category=Non-fiction">Non-Fiction</Link>
          </div>
          <div
            id="see-more-category"
            className="category-item see-more"
            style={{ backgroundImage: "url('/CategoryImages/seemore.webp')" }}
          >
            <Link to="/categories">See More</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
