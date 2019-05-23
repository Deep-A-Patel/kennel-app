import React, { Component } from "react";
import LocationItem from "./LocationItem";

export default class LocationList extends Component {
  render() {
    return (
      <section>
        <div className="locationButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/locations/new");
            }}
          >
            Admit Location
          </button>
        </div>
        <h2>All Locations</h2>
        {this.props.locations.map(item => {
          return (
            <LocationItem
              key={item.id}
              location={item}
              deleteLocation={this.props.deleteLocation}
            />
          );
        })}
      </section>
    );
  }
}
