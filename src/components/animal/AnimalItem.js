import React, { Component } from "react";
import { Link } from "react-router-dom";
import dog from "./dog.jpg";
import "./Animal.css";

class AnimalItem extends Component {
  state = {
    saveDisabled: false
  };

  handleClick = event => {
    console.log("click", event, this.props.animal.id);
    this.setState({
      saveDisabled: true
    });
    this.props.deleteAnimal(this.props.animal.id);
  };

  render() {
    return (
      <article>
        <img src={dog} className="icon--dog" />
        <h3>{this.props.animal.name}</h3>
        <button onClick={this.handleClick} disabled={this.state.saveDisabled}>
          Delete
        </button>
        <Link className="btn" to={`/animals/${this.props.animal.id}`}>
          Details
        </Link>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            this.props.history.push(`/animals/${this.props.animal.id}/edit`);
          }}
        >
          Edit
        </button>
      </article>
    );
  }
}

export default AnimalItem;
