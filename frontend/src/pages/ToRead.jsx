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
        const bookIds = response.data.map(book => book.book_id);
        console.log('1) Books Ids:', bookIds);

        const fetchedBooks = [];
        for (const id of bookIds) {
          try {
            console.log('2) Book Id:', id);
            const oneBook = await axios.get(`http://localhost:8081/books/${id}`);
            console.log('3) One Book Data:', oneBook.data);
            fetchedBooks.push(oneBook.data);
          } catch (error) {
            console.error(`Error fetching book with ID ${id}:`, error);
          }
        }

        // Elimină dublurile din lista cărților
        const uniqueBooks = fetchedBooks.filter(
          (book, index, self) =>
            index === self.findIndex(b => b.id === book.id)
        );

        setBooks(uniqueBooks);
        console.log('4) Unique Books:', uniqueBooks);
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

  const handleClick2 = async () => {
    // Logică pentru "Done to read"
  };

  return (
    <>
      <h1>Carti de citit</h1>
      <br />
      <div className="items-container">
        {books.length === 0 ? (
          <p>Nu există cărți disponibile.</p>
        ) : (
          books.map(book => (
            <div className="item-box" key={book.id}>
              {book.cover_image && (
                            <img src={book.cover_image} alt={book.title} style={{ maxWidth: "250px", height: "auto" }} />
                        )}
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p>{book.description}</p>
              <button className="delete" onClick={() => handleClick1(book.id)}>Delete from your library</button>
              <button className="update" onClick={handleClick2}>Done to read</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ToRead;
