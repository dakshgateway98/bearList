import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";

import ListBear from "../components/ListBear";
import App from "./../App";
class Routes extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div class="topbar">
          <div class="container">
            <div class="row">
              <div class="col-s-4">
                <h1 class="push-left">Bears List Data</h1>
              </div>
              <div class="offset-s-4 col-s-4"></div>
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
          <Route component={ListBear} path="/list" />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
