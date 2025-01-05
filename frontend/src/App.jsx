import './style.css'
import AllBooks from "./pages/AllBooks"
import AddBook from "./pages/AddBook"
import UpdateBook from "./pages/UpdateBook"
import ShowBook from "./pages/ShowBook"
import AllCategories from "./pages/AllCategories"
import AddCategory from "./pages/AddCategory"
import UpdateCategory from "./pages/UpdateCategory"
import ShowCategory from "./pages/ShowCategory"
import HomePage from "./pages/HomePage"
import RegistrationPage from "./pages/Registration"
import LoginPage from "./pages/Login"
import ProfilePage from './pages/Profile'
import {UserProvider}  from './pages/UserContext'
import ProfilePicture from './pages/AddProfilePicture'
import BooksToRead from './pages/ToRead'
import BooksRead from './pages/Read'


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
      <UserProvider>
      <Routes>

      <Route path="/" element={<LoginPage/>}/>

      <Route path="/registration" element={<RegistrationPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/picture" element={<ProfilePicture/>}/>

      <Route path="/homepage" element={<HomePage/>}/>
      
      <Route path="/categories" element={<AllCategories/>}/>
      <Route path="/categories/add" element={<AddCategory/>}/>
      <Route path="/categories/update/:id" element={<UpdateCategory/>}/>
      <Route path="/categories/:id" element={<ShowCategory/>}/>

      <Route path="/books" element={<AllBooks/>}/>
      <Route path="/books/:id" element={<ShowBook/>}/>
      <Route path="/books/add" element={<AddBook/>}/>
      <Route path="/books/update/:id" element={<UpdateBook/>}/>

      <Route path="/toread" element={<BooksToRead/>}/>
      <Route path="/read" element={<BooksRead/>}/>

      </Routes>
      </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
