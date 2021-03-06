import React, { Component } from "react";
import dog from "./dog.jpg";

export default class Animal extends Component {
  state = {
    saveDisabled: false
  };

  render() {
    return (
      <section className="animal">
        <div key={this.props.animal.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              <img src={dog} className="icon--dog" />
              {this.props.animal.name}
            </h4>
            <h5>{this.props.animal.breed}</h5>

            <button
              onClick={() => {
                this.setState({ saveDisabled: true }, () =>
                  this.props.deleteAnimal(this.props.animal.id)
                );
              }}
              disabled={this.state.saveDisabled}
              className="card-link"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    );
  }
}
