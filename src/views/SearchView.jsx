import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
//components
import GridCardList from "../components/Grid/GridList.jsx"

export default function SearchView () {

    const [searchInput, setSearchInput] = React.useState(''); 
    const [searchArray, setSearchArray] = React.useState([]); 
    const [resultsCount, setResultsCount] = React.useState(0);
    const APIkey = process.env.REACT_APP_API_KEY;

    const onSearchChange = (event) => {
        setSearchArray([]);
        setResultsCount(0);
        setSearchInput(event.target.value);       
        console.log('searchInput' , searchInput, searchArray);
    }

    const setResultCount = (count) => {
        setResultsCount(count);
    }

    function AddMovieArray(movies) {
        setSearchArray(searchArray => [...searchArray, ...movies]);
    }

    const fetchMovie = (part) => {
        fetch('http://www.omdbapi.com/?apikey=' + APIkey + '&s=' + searchInput + '&page='+ part)
            .then(response=> response.json())
            .then(movies => {if (movies.Response==='True') {
                AddMovieArray(movies.Search)
                setResultCount(movies.totalResults)
            }})
            .catch(err => {console.log('FETCH ERROR: ', err)});
    }

    // http://www.omdbapi.com/?apikey=dc520480&s=Batman

    React.useEffect(() => {
        console.log('FETCH for ', searchInput);
            fetchMovie(1);
            fetchMovie(2);
    }, [searchInput])

    return (
        <React.Fragment>
             <div style={{"display":"flex","justifyContent": "flex-start"}}>
                <form className="" 
                    noValidate 
                    autoComplete="off"
                    onChange={onSearchChange}>
                    <TextField id="outlined-basic" label="Search Movie" variant="outlined" />
                </form>
                <div style={{"fontSize":"22px","padding":"12px"}}>
                    Results: {resultsCount} </div>
            </div>
            <GridCardList searchArray={searchArray}
                        resultsCount={resultsCount}/>
        </React.Fragment>
        )
 }

