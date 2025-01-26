import { useUser } from './UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Read = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/library/id/${user.id}`);
        const bookIds = response.data
          .filter(book => book.readit === 1) // Preia doar cărțile citite
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

    fetchReadBooks();
  }, [user.id]);

  return (
    <div>
      <h1>Carti citite</h1>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Read;
