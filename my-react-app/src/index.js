import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactSession } from 'react-client-session';

import './index.css';
// import Component1 from './App';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { name, age } from "./customfiles/person.js";
// import message from "./customfiles/message.js";
// import MyForm from './customfiles/form.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Routes
root.render(<App />);
// root.render(<Component1 />);



// import Car from "./customfiles/Car.js";

// const myFirstElement = <h1>Hello React!</h1>


// forms

// root.render(<MyForm />);

// Using loop
// function Car(props) {
//     return <li>I am a { props.brand }</li>;
//   }
  
//   function Garage() {
//     const cars = ['Ford', 'BMW', 'Audi'];
//     return (
//       <>
//         <h1>Who lives in my garage?</h1>
//         <ul>
//           {cars.map((car) => <Car brand={car} />)}
//         </ul>
//       </>
//     );
//   }
//   root.render(<Garage />);
// Function Components 


//   function Garage() {
//     return (
//       <>
//         <h1>Who lives in my Garage?</h1>
//         <Car />
//       </>
//     );
//   }
// root.render(<Garage />);

// const myelement = (      // parentheses are used to write html in multiple lines.
// <div>
//     <table>
//       <tr>
//         <th>Name {5 + 5}</th>
//       </tr>
//       <tr>
//         <td>John</td>
//       </tr>
//       <tr>
//         <td>Elsa</td>
//       </tr>
//     </table>
//     <h1 className="myclass">Hello World</h1>
//     </div>
//   );
// root.render(myelement);


// const myArray = ['apple', 'banana', 'orange'];

// const myList = myArray.map((item) => <p>{item}</p>)
// root.render(message(name, age));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
