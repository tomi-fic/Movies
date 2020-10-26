import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { createLogger } from  'redux-logger'; //DEV only
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { searchMovie, requestMovie } from "./reducers.js"

import "./assets/css/index.css";

import Layout from "./layouts/Layout.jsx";

// const logger = createLogger(); // DEV only
const rootReducer = combineReducers({searchMovie, requestMovie})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, 
                                                      // logger // DEV only
                                                      )); 

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/movies" render={props => 
        <Provider store={store}>
          <Layout {...props} />
        </Provider>} 
      />
      <Redirect from="/" to="/movies/search" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);