// import logo from './logo.svg';
// import './App.css';
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Todos from "./pages/Todos";
import Users from "./pages/Users";
import Create from "./pages/Create";
import Read from "./pages/Read";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Sidebar from "./pages/Sidebar";

import Books from "./books/Books";
import CreateBook from "./books/CreateBook";
import EditBook from "./books/EditBook";
import ReadBook from "./books/ReadBook";
import BookAssignment from "./books/BookAssignment";
import BookAssign from "./books/BookAssign";
import BookAssignDetail from "./books/BookAssignDetail";

const UserContext = createContext()

function App() {

  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title="home" />} />
          <Route path="blogs" element={<Blogs title="blogs" />} />
          <Route path="contact" element={<Contact title="contact" />} />
          <Route path="todocount" element={<Todos />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage todos={todos} />} />
        </Route>


        <Route path="/user/" element={<Sidebar />}>
          <Route index path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="create" element={<Create />} />
          <Route path="logout" element={<Logout />} />
          <Route path="read/:id" element={<Read />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="*" element={<NoPage todos={todos} />} />
        </Route>

        <Route path="/book/" element={<Sidebar />}>
          <Route index path="books" element={<Books />} />
          <Route path="create" element={<CreateBook />} />
          <Route path="edit/:id" element={<EditBook />} />
          <Route path="read/:id" element={<ReadBook />} />
          <Route path="assignments" element={<BookAssignment />} />
          <Route path="assign_book/:id" element={<BookAssign />} />
          <Route path="assignment_details/:id" element={<BookAssignDetail />} />
          <Route path="*" element={<NoPage todos={todos} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
  
}

// export default App;
export default App;
