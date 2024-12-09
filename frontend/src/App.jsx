import './style.css'
import AllBooks from "./pages/AllBooks"
import AddBook from "./pages/AddBook"
import UpdateBook from "./pages/UpdateBook"
import AllCategories from "./pages/AllCategories"
import ShowBook from "./pages/ShowBook"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
      <Routes>
      <Route path="/categories" element={<AllCategories/>}/>
      <Route path="/" element={<AllBooks/>}/>
      <Route path="/add" element={<AddBook/>}/>
      <Route path="/update/:id" element={<UpdateBook/>}/>
      <Route path="/book/:id" element={<ShowBook/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
