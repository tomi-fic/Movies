import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/css/index.css";

// import Main from "./layouts/Main.jsx";
import Layout from "./layouts/Layout.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/movies" render={props => <Layout {...props} />} />
      <Redirect from="/" to="/movies/search" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// ReactDOM.render(<Main/>, document.getElementById('root'));
