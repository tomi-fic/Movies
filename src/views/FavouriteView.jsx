import React from "react";
import {connect} from 'react-redux';
import GridCardList from "../components/Grid/GridList.jsx";

const mapStateToProps = state => {
    return {
        favouriteMovies: state.requestMovie.favouriteMovies,
    }
  }

function FavouriteView (props) {
    return props.favouriteMovies.length < 1
        ? <h1>No favourite movie to display</h1>
        : (<div>
            <GridCardList />
        </div>)
 }

 export default connect(mapStateToProps, null)(FavouriteView);