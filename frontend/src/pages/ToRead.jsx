import { useUser  } from './UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ToRead = () => {

  const { user } = useUser();
  const [ books, setBooks] = useState([])
  const [setIsAdmin] = useState(false);

     useEffect(() => {
       const fetchUserRole = async () => {
         const token = localStorage.getItem('accessToken');
         if (!token) {
           console.error('No token found. Please log in.');
           return ;
         }
   
         try {
           const res = await axios.get("http://localhost:8081/userrole", {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           });
           if (res.data.role === 1) {
             setIsAdmin(true);
           }
         } catch (error) {
           
           console.error("Error fetching user role:", error);
         }
       };
   
       fetchUserRole();
     }, []);
 
     useEffect(()=>{
      const fetchAllBooks = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/library/id/${user.id}`);
          if (Array.isArray(response.data)) {
            setBooks(response.data);
          } else {
            console.error('Data is not an array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
      fetchAllBooks()
  }, [])


    return (
      <>
        <h1>Carti de citit</h1>
        <br></br>
        <div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                </div>
            ))}
        </div>
      </>
    );
    
  };
  
  export default ToRead;