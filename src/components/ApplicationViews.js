import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import React, { Component } from "react";
/////////////////////// Animal ///////////////////////
import AnimalList from "./animal/AnimalList";
import AnimalManager from "../modules/AnimalManager";
import AnimalDetail from "./animal/AnimalDetail";
import AnimalForm from "./animal/AnimalForm";
import AnimalEditForm from "./animal/AnimalEditForm";
//////////////////////  Location /////////////////////
import LocationList from "./location/LocationList";
import LocationManager from "../modules/LocationManager";
import LocationDetail from "./location/LocationDetail";
import LocationForm from "./location/LocationForm";
///////////////////// Employee /////////////////////
import EmployeeList from "./employee/EmployeeList";
import Login from "./authentication/Login";

class ApplicationViews extends Component {
  employeesFromAPI = [
    { id: 1, name: "Jessica Younker" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
  ];

  locationsFromAPI = [
    { id: 1, name: "Nashville North", address: "500 Circle Way" },
    { id: 2, name: "Nashville South", address: "10101 Binary Court" }
  ];

  animalsFromAPI = [
    { id: 1, name: "Doodles" },
    { id: 2, name: "Jack" },
    { id: 3, name: "Angus" },
    { id: 4, name: "Henley" },
    { id: 5, name: "Derkins" },
    { id: 6, name: "Checkers" }
  ];

  state = {
    employees: this.employeesFromAPI,
    locations: [],
    animals: []
  };

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  ////////////////////////////// Animal ///////////////////////////////////
  deleteAnimal = id => {
    const newState = {};
    AnimalManager.deleteAnimal(id)
      .then(AnimalManager.getAll)
      .then(animals => {
        console.log("animals", animals);
        newState.animals = animals;
      })
      .then(() => {
        this.props.history.push("/animals");
        this.setState(newState);
      });
  };

  addAnimal = animal =>
    AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );

  updateAnimal = editedAnimalObject => {
    return AnimalManager.put(editedAnimalObject)
      .then(() => AnimalManager.getAll())
      .then(animals => {
        this.props.history.push("/animals");
        this.setState({
          animals: animals
        });
      });
  };

  componentDidMount() {
    console.log("APPVIEWS componentDidMount");
    const newState = {};
    /////////////////////// Animal ////////////////////
    AnimalManager.getAll()
      .then(animals => {
        console.log("animals", animals);
        newState.animals = animals;
      })
      .then(() =>
        LocationManager.getAll()
          .then(locations => {
            console.log("locations", locations);
            newState.locations = locations;
          })
          .then(() => this.setState(newState))
      );
  }

  ////////////////////////////// Location ///////////////////////////////////
  deleteLocation = id => {
    const newState = {};
    LocationManager.deleteLocation(id)
      .then(LocationManager.getAll)
      .then(locations => {
        console.log("locations", locations);
        newState.locations = locations;
      })
      .then(() => {
        this.props.history.push("/");
        this.setState(newState);
      });
  };

  addLocation = location =>
    LocationManager.post(location)
      .then(() => LocationManager.getAll())
      .then(locations =>
        this.setState({
          locations: locations
        })
      );

  render() {
    console.log("APPVIEWS render");
    return (
      <>
        <Route path="/login" component={Login} />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        {/* Animal */}
        <Route
          exact
          path="/animals"
          render={props => {
            return (
              <AnimalList
                animals={this.state.animals}
                {...props}
                deleteAnimal={this.deleteAnimal}
              />
            );
          }}
        />
        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            // Find the animal with the id of the route parameter
            let animal = this.state.animals.find(
              animal => animal.id === parseInt(props.match.params.animalId)
            );

            // If the animal wasn't found, create a default one
            if (!animal) {
              animal = { id: 404, name: "404", breed: "Dog not found" };
            }

            return (
              <AnimalDetail animal={animal} deleteAnimal={this.deleteAnimal} />
            );
          }}
        />
        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }}
        />

        <Route
          path="/animals/:animalId(\d+)/edit"
          render={props => {
            return (
              <AnimalEditForm
                {...props}
                employees={this.state.employees}
                updateAnimal={this.updateAnimal}
              />
            );
          }}
        />

        {/* Location */}

        <Route
          exact
          path="/"
          render={props => {
            return (
              <LocationList
                locations={this.state.locations}
                {...props}
                deleteLocation={this.deleteLocation}
              />
            );
          }}
        />
        <Route
          path="/locations/:locationId(\d+)"
          render={props => {
            // Find the location with the id of the route parameter
            let location = this.state.locations.find(
              location =>
                location.id === parseInt(props.match.params.locationId)
            );

            // If the location wasn't found, create a default one
            if (!location) {
              location = { id: 404, name: "404", address: "address not found" };
            }

            return (
              <LocationDetail
                location={location}
                deleteLocation={this.deleteLocation}
              />
            );
          }}
        />
        <Route
          path="/locations/new"
          render={props => {
            return (
              <LocationForm
                {...props}
                addLocation={this.addLocation}
                employees={this.state.employees}
              />
            );
          }}
        />
        {/* Employee */}
        <Route
          path="/employees"
          render={props => {
            return <EmployeeList employees={this.state.employees} />;
          }}
        />
      </>
    );
  }
}

export default withRouter(ApplicationViews);
