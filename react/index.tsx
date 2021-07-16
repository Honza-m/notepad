import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dash from "./components/Dash";
import './scss/style.scss';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/app/test/">TEST</Route>
      <Route exact path="/app/"><Dash /></Route>
      <Route path="">React 404</Route>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('react-root'));