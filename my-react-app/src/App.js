// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
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

const UserContext = createContext()
// sdfjksfj helo



// function Component1() {
//   const [user, setUser] = useState("Jesse Hall");

//   return (
//     <UserContext.Provider value={user}>
//       <h1>{`Hello ${user}!`}</h1>
//       <Component2 />
//     </UserContext.Provider>
//   );
// }

// function Component2() {
//   return (
//     <>
//       <h1>Component 2</h1>
//       <Component3 />
//     </>
//   );
// }

// function Component3() {
//   return (
//     <>
//       <h1>Component 3</h1>
//       <Component4 />
//     </>
//   );
// }

// function Component4() {
//   return (
//     <>
//       <h1>Component 4</h1>
//       <Component5 />
//     </>
//   );
// }

// function Component5() {
//   const user = useContext(UserContext);

//   return (
//     <>
//       <h1>Component 5</h1>
//       <h2>{`Hello ${user} again!`}</h2>
//     </>
//   );
// }

function App() {

  // const [count, setCount] = useState(0);
  // const [todos, setTodos] = useState([]);

  // const increment = () => {
  //   setCount((c) => c + 1);
  // };
  // const addTodo = useCallback(() => {
  //   setTodos((t) => [...t, "New Todo"]);
  // }, [todos]);

  // const [inputValue, setInputValue] = useState("");  // usestate return two items, value and function
  // const count = useRef(0);   // it return only one item i.e object called current. it look like 
  //                               // const count = {current:0},  We can access the count by using count.current.

  // useEffect(() => {
  //   count.current = count.current + 1;
  // });

  // const [count, setCount] = useState(0);   
  // const [calculation, setCalculation] = useState(0);

  // useEffect(() => {
  //   setCalculation(() => count * 2);
  // }, [count]); // <- add the count variable here

  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);
  // }, []); // <- add empty brackets here

  // const [car, setCar] = useState({
  //   brand: "Ford",
  //   model: "Mustang",
  //   year: "1964",
  //   color: "red"
  // });

  // const updateColor = () => {
  //   setCar(previousState => {
  //     return { ...previousState, color: "blue" }
  //   });
  // }
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  // const increment = () => {
  //   setCount((c) => c + 1);
  // };

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
          <Route path="*" element={<NoPage todos={todos} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
  // <>
  //   <Todos todos={todos} />
  //   <hr />
  //   <div>
  //     Count: {count}
  //     <button onClick={increment}>+</button>
  //   </div>
  // </>
  // <>
  // <h1>My {car.brand}</h1>
  //   <p>
  //     It is a {car.color} {car.model} from {car.year}.
  //   </p>
  //   <button
  //     type="button"
  //     onClick={updateColor}
  //   >Blue</button>
  // </>

  // );
  // return <h1>I've rendered {count} times!</h1>;
  // return (
  //   <>
  //   <input
  //       type="text"
  //       value={inputValue}
  //       onChange={(e) => setInputValue(e.target.value)}
  //     />
  //     <h1>Render Count: {count.current}</h1>
  //   </>
  // );
  // <p>Count: {count}</p>
  // <button onClick={() => setCount((c) => c + 1)}>+</button>
  // <p>Calculation: {calculation}</p>

  // return (
  //   <>
  //     <Todos todos={todos} addTodo={addTodo} />
  //     <hr />
  //     <div>
  //       Count: {count}
  //       <button onClick={increment}>+</button>
  //     </div>
  //   </>
  // );

}

// export default App;
export default App;
