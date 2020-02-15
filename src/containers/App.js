import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";
import { setSearchField, requestRobots } from "../actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   .then(users => this.setState({ robots: users }));
    this.props.onRequestRobots();
  }

  // onSearchChange = event => {
  //   this.setState({ searchfield: event.target.value });
  // };

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filterRobots = robots.length
      ? robots.filter(robots => {
          return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })
      : [];
    if (isPending) {
      return <h1>Loading</h1>;
    }
    return (
      <div className="tc">
        <h1 className="heading">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filterRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
