import React, { Component } from "react";


export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>user</h3>
        </header>
      </div>
    );
  }
}