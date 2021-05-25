import React, { Component } from 'react';
import '../App.css';
import '../index.css';


class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return(
      <div className="App">
        <table class="table table-striped">
        <thead class="thead-inverse">
        <tr>
            <td>#</td>
            <td>name</td>
            <td>username</td>
            <td>email</td>
            <td>website</td>
        </tr>
        </thead>
          <tbody>
          {this.state.users.map(n => (
            <tr key={n.id}>
            <td >{n.id}</td>
              <td >{n.name}</td>
              <td>{n.username}</td>
              <td>{n.email}</td>
              <td>{n.website}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
