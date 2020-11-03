import React from "react";
import {useSelector} from 'react-redux';
import GridCardList from "../components/Grid/GridList.jsx";

export default function FavouriteView () {
    return useSelector(state => state.requestMovie.favouriteMovies).length < 1
        ? <h1>No favourite movie to display</h1>
        : (<div>
            <GridCardList />
        </div>)
 }