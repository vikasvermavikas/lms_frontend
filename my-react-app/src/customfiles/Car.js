import React from 'react';
// Function component
// function Car(props) {
//     return <h2>I am a {props.color} Car!</h2>;
// }

// class component

class Car extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
      };
    }
    changeColor = () => {
        this.setState({color: "blue"});
      }

    render() {
      return (
        <div>
          <h1>My {this.state.brand}</h1>
          <p>
            It is a {this.state.color}
            {this.state.model}
            from {this.state.year}.
          </p>
          <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
        </div>
      );
    }
  }
export default Car;
