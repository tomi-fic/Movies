import React from "react";

import DetailCard from '../components/Card/DetailCard.jsx'

export default function DetailView (props) {
    return props.selectedMovie.length < 1
        ? <h1>No movie selected</h1>
        : (<div>
                <DetailCard movie={props.selectedMovie[0]}
                            addToFavourites={props.addToFavourites}
                            removeFromFavourites={props.removeFromFavourites}
                            isAddedToFavourites={props.isAddedToFavourites}/>
           </div>)
 }

