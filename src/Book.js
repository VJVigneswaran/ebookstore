import React, { useState, useEffect } from 'react'; // Import React and hooks
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for routing
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from './firebase'; // Import Firestore database instance
import './Book.css'; // Import component-specific CSS
import { useCart } from './context/CartContext'; // Import custom Cart context

const Book = () => {
  const { addToCart } = useCart(); // Destructure addToCart function from Cart context
  const { bookId } = useParams(); // Get bookId from URL parameters
  const [book, setBook] = useState(null); // State to hold the selected book data
  const [similarBooks, setSimilarBooks] = useState([]); // State to hold similar books
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Function to fetch similar books in the same category
    const fetchSimilarBooks = async (category) => {
      const colRef = collection(db, 'books'); // Reference to the 'books' collection
      const q = query(colRef, where("category", "==", category)); // Query to find books in the same category
      const querySnapshot = await getDocs(q); // Execute query

      const booksInCategory = []; // Array to hold books in the category
      querySnapshot.forEach((doc) => {
        if (doc.id !== bookId) { // Exclude the currently selected book
          booksInCategory.push({ id: doc.id, ...doc.data() }); // Push book data to the array
        }
      });

      setSimilarBooks(booksInCategory); // Update state with similar books
    };

    const getBookById = async (id) => {
      const docRef = doc(db, 'books', id); // Reference to the specific book document
      const docSnap = await getDoc(docRef); // Get the book document

      if (docSnap.exists()) {
        const fetchedBook = docSnap.data(); // Fetch book data
        setBook(fetchedBook); // Update state with fetched book data
        fetchSimilarBooks(fetchedBook.category); // Fetch similar books based on category
      } else {
        console.log("No such book found!"); // Log if no book is found
      }
    };

    if (bookId) {
      getBookById(bookId); // Fetch book data if bookId exists
    }
  }, [bookId]);

  const handleAddToCart = (book) => {
    addToCart(book); // Call addToCart function to add the book to the cart
    alert(`${book.title} has been added to your cart!`); // Alert user that the book has been added
  }

  return (
    <div className="book-container">
      {book ? (
        <>
          {/* Left Side: Selected Book */}
          <div className="book-details">
            <img src={`/${book.img}`} alt={book.title} className="book-image" />
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <h3>Description</h3>
            <p>{book.description}</p>
            <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
          </div>

          {/* Right Side: Similar Books */}
          <div className="similar-books">
            <h3>Similar Books</h3>
            <div className="similar-books-list">
              {similarBooks.length > 0 ? (
                similarBooks.map((similarBook) => (
                  <div className="similar-book" key={similarBook.id} onClick={() => navigate(`/categories/book/${similarBook.id}`)}>
                    <img src={`/${similarBook.img}`} alt={similarBook.title} className="similar-book-image" />
                    <h4>{similarBook.title}</h4>
                  </div>
                ))
              ) : (
                <p>No similar books found.</p> // Message when no similar books are available
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading book details...</p> // Loading message while fetching book data
      )}
    </div>
  );
};

export default Book; // Export the Book component
