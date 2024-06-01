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

import UserProfile from "./users/UserProfile";
import UpdateProfile from "./users/UpdateProfile";

import Books from "./books/Books";
import CreateBook from "./books/CreateBook";
import EditBook from "./books/EditBook";
import ReadBook from "./books/ReadBook";
import BookAssignment from "./books/BookAssignment";
import BookAssign from "./books/BookAssign";
import BookAssignDetail from "./books/BookAssignDetail";
import BookStock from "./books/BookStock";

import RequireAuth from './components/RequireAuth';
import GuestDashboard from './components/GuestDashboard';
import GuestAssignment from './components/GuestAssignment';
import AssignmentView from './components/AssignmentView';

// const UserContext = createContext()
function App() {
  const token = localStorage.getItem("USER");

  // console.log(token);

  // if (!localStorage.getItem("USER")) {
  //   <Logout />
  // }

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

        {/* <Route element={<RequireAuth />}> */}
          <Route path="/user/" element={<Sidebar />}>
            <Route index path="register" element={<RequireAuth><Register /></RequireAuth>} />
            <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="users" element={<RequireAuth><Users /></RequireAuth>} />
            <Route path="create" element={<RequireAuth><Create /></RequireAuth>} />
            <Route path="logout" element={<RequireAuth><Logout /></RequireAuth>} />
            <Route path="read/:id" element={<RequireAuth><Read /></RequireAuth>} />
            <Route path="edit/:id" element={<RequireAuth><Edit /></RequireAuth>} />
            <Route path="profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
            <Route path="updateProfile" element={<RequireAuth><UpdateProfile /></RequireAuth>} />
            <Route path="*" element={<NoPage todos={todos} />} />
          </Route>

          <Route path="/book/" element={<Sidebar />}>
            <Route index path="books" element={<RequireAuth><Books /></RequireAuth>} />
            <Route path="create" element={<RequireAuth><CreateBook /></RequireAuth>} />
            <Route path="edit/:id" element={<RequireAuth><EditBook /></RequireAuth>} />
            <Route path="read/:id" element={<RequireAuth><ReadBook /></RequireAuth>} />
            <Route path="assignments" element={<RequireAuth><BookAssignment /></RequireAuth>} />
            <Route path="assign_book/:id" element={<RequireAuth><BookAssign /></RequireAuth>} />
            <Route path="assignment_details/:id" element={<RequireAuth><BookAssignDetail /></RequireAuth>} />
            <Route path="stock" element={<RequireAuth><BookStock /></RequireAuth>} />
            <Route path="*" element={<NoPage todos={todos} />} />
          </Route>

          <Route path="/guest/" element={<Sidebar />}>
          <Route path="dashboard" element={<RequireAuth><GuestDashboard /></RequireAuth>} />
          <Route path="assignments" element={<RequireAuth><GuestAssignment /></RequireAuth>} />
          <Route path="book/view/:id" element={<RequireAuth><AssignmentView /></RequireAuth>} />
          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );

}

// export default App;
export default App;
