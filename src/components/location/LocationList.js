import React, { Component } from "react";
import LocationItem from "./LocationItem";

export default class LocationList extends Component {
  render() {
    return (
      <section>
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
