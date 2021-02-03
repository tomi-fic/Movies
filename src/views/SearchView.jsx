import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
//components
import GridCardListInfinite from "../components/Grid/GridListInfinite.jsx";
//actions
import { setSearchField, 
        resetSearchArray, 
        requestMovie, 
        setPage,
        requestMovieDetail } from "../actions.js";

export default function SearchView () {

    const {searchMoviesArray, resultsCount, page} = useSelector(state => state.requestMovie)
    const searchField = useSelector(state => state.searchMovie.searchField);
    const [relink, changeRelink] = useState(false);
    const dispatch = useDispatch();

    const selectMovie = (movieId) => {
        dispatch(requestMovieDetail(movieId))
        // dispatch(setSearchField(''))
        // dispatch(resetSearchArray())
    }

    const fetchAnotherPage = () => {
        dispatch(requestMovie(searchField, page+2))
        dispatch(requestMovie(searchField, page+3))
        dispatch(setPage(page+2))
    }

    useEffect(() => {
        if (relink) {
            dispatch(requestMovie(searchField, page))
            dispatch(requestMovie(searchField, page+1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchField])

    return (
        <React.Fragment>
             <div style={{"display":"flex",
                        "justifyContent": "flex-start"}}>
                <form className="" 
                    noValidate 
                    autoComplete="off"
                    onChange={(event) => {
                        changeRelink(true)
                        dispatch(setSearchField(event.target.value))
                        dispatch(resetSearchArray())
                    }}>
                    <TextField id="outlined-basic" 
                            label="Search Movie" 
                            variant="outlined" 
                            value={searchField}/>
                </form>
                <div style={{"fontSize":"22px",
                            "padding":"12px"}}>
                    Results: {resultsCount} </div>
            </div>
            <GridCardListInfinite searchArray={searchMoviesArray}
                        resultsCount={resultsCount}
                        fetchAnotherPage={fetchAnotherPage}
                        selectMovie={selectMovie}/>
        </React.Fragment>
        )
 }
