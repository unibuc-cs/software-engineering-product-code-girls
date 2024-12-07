//import './App.css'
import AllBooks from "./pages/AllBooks"
import AddBook from "./pages/AddBook"
import UpdateBook from "./pages/UpdateBook"
import AllCategories from "./pages/AllCategories"

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
      <Route path="/update" element={<UpdateBook/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
