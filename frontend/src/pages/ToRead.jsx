import { useUser } from './UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ToRead = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/library/id/${user.id}`);
        const bookIds = response.data
          .filter(book => book.readit === 0 || book.readit === null) // Preia doar cărțile necitite sau fără valoare setată
          .map(book => book.book_id);

        const fetchedBooks = [];
        for (const id of bookIds) {
          try {
            const oneBook = await axios.get(`http://localhost:8081/books/${id}`);
            fetchedBooks.push(oneBook.data);
          } catch (error) {
            console.error(`Error fetching book with ID ${id}:`, error);
          }
        }

        const uniqueBooks = fetchedBooks.filter(
          (book, index, self) => index === self.findIndex(b => b.id === book.id)
        );

        setBooks(uniqueBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchAllBooks();
  }, [user.id]);

  const handleClick1 = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8081/library/delete/${bookId}`);
      const newBooks = books.filter(book => book.id !== bookId);
      setBooks(newBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleClick2 = async (bookId) => {
    try {
      await axios.put(`http://localhost:8081/library/mark-as-read/${user.id}/${bookId}`);
      const newBooks = books.filter(book => book.id !== bookId);
      setBooks(newBooks);
    } catch (error) {
      console.error('Error marking book as read:', error);
    }
  };

  return (
    <>
      <h1>To-read books</h1>
      <br />
      <div className="items-container">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          books.map(book => (
            <div className="item-box" key={book.id}>
              {book.cover_image && (
                <img src={book.cover_image} alt={book.title} style={{ maxWidth: "250px", height: "auto" }} />
              )}
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p>{book.description}</p>
              <button className="b_books" onClick={() => handleClick1(book.id)}>Delete from your library</button>
              <button className="b_books" onClick={() => handleClick2(book.id)}>Done to read</button>
            </div>
          ))
        )}
      </div>
      <div style={{padding: "20px"}}></div>
    </>
  );
};

export default ToRead;
