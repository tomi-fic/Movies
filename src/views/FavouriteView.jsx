import React from "react";
import GridCardList from "../components/Grid/GridList.jsx"

export default function FavouriteView (props) {
    
    const selectMovie = (movieId) => {
        fetch('http://www.omdbapi.com/?apikey=dc520480&i=' + movieId + '&plot=full')
            .then(response=> response.json())
            .then(movieDetail => {props.selectMovie(movieDetail)});
    }

    return props.favouriteMovies.length < 1
        ? <h1>No favourite movie to display</h1>
        : (<div>
            <GridCardList favouriteMovies={props.favouriteMovies}
                        selectMovie={selectMovie}
                        removeFromFavourites={props.removeFromFavourites}
                        />
        </div>)
 }

