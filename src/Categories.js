import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore functions
import { useLocation, useNavigate } from 'react-router-dom'; // Import for routing and navigation
import { db } from './firebase'; // Import Firebase config
import "./Categories.css"; // Import for component-specific styling
import { useCart } from './context/CartContext'; // Import Cart context

// Custom hook to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Categories = () => {
  const { addToCart } = useCart(); // Access addToCart function from CartContext
  const [books, setBooks] = useState([]); // State to store books
  const queryParams = useQuery(); // Get the query parameters
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'Fiction'); // Category selection state
  const navigate = useNavigate(); // Navigate for programmatic navigation

  // Function to fetch books based on selected category
  const getBooksByCategory = async (category) => {
    const colRef = collection(db, 'books'); // Reference to Firestore collection
    const q = query(colRef, where("category", "==", category)); // Query to filter by category
    const querySnapshot = await getDocs(q); // Get documents matching the query
    
    let fetchedBooks = [];
    querySnapshot.forEach((doc) => {
      fetchedBooks.push({ id: doc.id, ...doc.data() }); // Include the document ID for each book
    });
    
    setBooks(fetchedBooks); // Update the books state with fetched data
  };

  // Fetch books whenever selectedCategory changes
  useEffect(() => {
    getBooksByCategory(selectedCategory); // Call fetch function on selected category change
  }, [selectedCategory]);

  // Navigate to the book's detail page on click
  const handleBookClick = (bookId) => {
    navigate(`/categories/book/${bookId}`); // Route to specific book detail page
  };

  // Add book to cart and show alert
  const handleAddToCart = (book) => {
    addToCart(book); // Add book to cart
    alert(`${book.title} has been added to your cart!`); // Show feedback
  };

  return (
    <main>
      <div className="categories-container">
        {/* Category Navigation */}
        <nav className="categories-list">
          <h2>Categories</h2>
          <ul>
            <li><button onClick={() => setSelectedCategory("Fiction")}>Fiction</button></li>
            <li><button onClick={() => setSelectedCategory("Non-fiction")}>Non-Fiction</button></li>
            <li><button onClick={() => setSelectedCategory("Mystery")}>Mystery</button></li>
            <li><button onClick={() => setSelectedCategory("Sci-fi")}>Sci-Fi</button></li>
            <li><button onClick={() => setSelectedCategory("Programming")}>Programming</button></li>
            <li><button onClick={() => setSelectedCategory("Love")}>Love</button></li>
            <li><button onClick={() => setSelectedCategory("Mathematics")}>Mathematics</button></li>
          </ul>
        </nav>

        {/* Book Listing Section */}
        <section className="book-list">
          <h2>Books</h2>
          <div id="books-container">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div className="book" key={index}>
                  <img
                    src={book.img}
                    alt={book.title}
                    className="books-image"
                    onClick={() => handleBookClick(book.id)} // Click to navigate to book details
                  />
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Category:</strong> {book.category}</p>
                  <p><strong>Price:</strong> ₹{book.price}</p>
                  <button onClick={() => handleAddToCart(book)}>Add to Cart</button> {/* Add to cart button */}
                </div>
              ))
            ) : (
              <p>No books available in this category.</p> // Message if no books are available
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Categories;
