import React from "react";
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
//components
import GridCardListInfinite from "../components/Grid/GridListInfinite.jsx";
//actions
import { setSearchField, 
        resetSearchArray, 
        requestMovie, 
        setPage,
        requestMovieDetail } from "../actions.js";

const mapStateToProps = state => {
    return {
        searchField : state.searchMovie.searchField,
        searchMoviesArray: state.requestMovie.searchMoviesArray,
        resultsCount: state.requestMovie.resultsCount,
        page: state.requestMovie.page
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onSearchChange: (event) => {
            dispatch(resetSearchArray())
            dispatch(setSearchField(event.target.value))
        },
        onRequestMovie: (searchField, page) => dispatch(requestMovie(searchField, page)),
        onPageSet: (page) => dispatch(setPage(page)),
        onSelectMovie: (movieId) => {
            dispatch(requestMovieDetail(movieId))
            dispatch(setSearchField(''))
            dispatch(resetSearchArray())
        }
    }
}

function SearchView (props) {

    const selectMovie = (movieId) => {
        props.onSelectMovie(movieId)
    }

    const fetchAnotherPage = () => {
        props.onRequestMovie(props.searchField, props.page+2)
        props.onRequestMovie(props.searchField, props.page+3)
        props.onPageSet(props.page+2);
    }

    React.useEffect(() => {
        props.onRequestMovie(props.searchField, props.page);
        props.onRequestMovie(props.searchField, props.page+1)
    }, [props.searchField])

    return (
        <React.Fragment>
             <div style={{"display":"flex","justifyContent": "flex-start"}}>
                <form className="" 
                    noValidate 
                    autoComplete="off"
                    value={props.searchField}
                    onChange={props.onSearchChange}>
                    <TextField id="outlined-basic" label="Search Movie" variant="outlined" />
                </form>
                <div style={{"fontSize":"22px","padding":"12px"}}>
                    Results: {props.resultsCount} </div>
            </div>
            <GridCardListInfinite searchArray={props.searchMoviesArray}
                        resultsCount={props.resultsCount}
                        fetchAnotherPage={fetchAnotherPage}
                        selectMovie={selectMovie}/>
        </React.Fragment>
        )
 }

 export default connect(mapStateToProps, mapDispatchToProps)(SearchView); 
