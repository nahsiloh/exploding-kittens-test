import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kittens: [],
      owners: [],
      isLoggedIn: false
    };
  }

  fetchKittens = () => {
    //replacing the hard coded data
    // const kittens = [{ name: "Marcy", sex: "female", age: 5 }];

    //using the axios method
    const url = "http://localhost:5000/kittens";
    axios
      .get(url)
      .then(res => {
        this.setState({ kittens: res.data });
      })
      .catch(err => {
        console.error(err);
        this.setState({ kittens: [] });
      });
  };

  fetchOwners = () => {
    // const owners = [{ userName: "bob" }];
    // this.setState({ owners });
    const url = "http://localhost:5000/owners/lulu";

    axios
      .get(url, { withCredentials: true })
      .then(res => {
        this.setState({ owners: res.data });
      })
      .catch(err => {
        console.error(err);
        this.setState({ owners: [] });
      });
  };

  loginHandler = () => {
    const url = "http://localhost:5000/owners/login";
    axios
      .post(
        url,
        { userName: "Anastacio Powlowski", password: "asdfghjkl" },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({ isLoggedIn: true });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoggedIn: false });
      });
  };

  logoutHandler = () => {
    const url = "http://localhost:5000/owners/logout";
    axios
      .post(url, {}, { withCredentials: true })
      .then(() => {
        this.setState({ isLoggedIn: false, owners: [] });
      })
      .catch(err => {
        console.error(err);
      });
  };

  adoptKitten = name => {
    const url = "http://localhost:5000/kittens/" + name;
    axios
      .delete(url, { withCredentials: true })
      .then(res => {
        console.log(res);
        this.fetchKittens();
      })
      .catch(err => {
        console.error(err);
      });
  };

  createKitten = () => {
    console.log();
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.loginHandler}>Login</button>
        <button onClick={this.logoutHandler}>Logout</button>
        <p>You are logged {this.state.isLoggedIn ? "in" : "out"}</p>
        <button onClick={this.fetchKittens}>Get all kittens</button>
        {this.state.kittens.map(kitten => {
          return (
            <p key={kitten._id}>
              {kitten.name} is a {kitten.sex} kitten and it is {kitten.age}{" "}
              years old
              <button onClick={() => this.adoptKitten(kitten.name)}>
                Adopt
              </button>
            </p>
          );
        })}
        <button onClick={this.fetchOwners}>Get owners (protected route)</button>
        {this.state.owners.map(owner => {
          return (
            <p key={owner._id}>The owner's user name is {owner.userName}</p>
          );
        })}
        {/* <form>
          <label>Name:</label>
          <input type="string"></input>
          <br />
          <label>Age:</label>
          <input type="number"></input>
          <br />
          <label>Sex:</label>
          <select>
            <option>Male</option>
            <option>Female</option>
          </select>
          <button onClick={this.createKitten}>Submit</button>
        </form> */}
      </div>
    );
  }
}

export default App;
