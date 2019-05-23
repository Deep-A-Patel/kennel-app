import React, { Component } from "react";
import { Link } from "react-router-dom";
import location from "./location.jpg";

class LocationItem extends Component {
  state = {
    saveDisabled: false
  };

  handleClick = event => {
    console.log("click", event, this.props.location.id);
    this.setState({
      saveDisabled: true
    });
    this.props.deleteLocation(this.props.location.id);
  };

  render() {
    return (
      <article>
        <img src={location} className="icon--location" />
        <h3>{this.props.location.name}</h3>
        <button onClick={this.handleClick} disabled={this.state.saveDisabled}>
          Delete
        </button>
        <Link className="btn" to={`/locations/${this.props.location.id}`}>
          Details
        </Link>
      </article>
    );
  }
}

export default LocationItem;
