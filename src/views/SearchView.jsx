import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
//components
import GridCardList from "../components/Grid/GridList.jsx"

export default function SearchView (props) {

    const [searchInput, setSearchInput] = useState(''); 
    const [searchArray, setSearchArray] = useState([]); 
    const [resultsCount, setResultsCount] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [page, setPage] = React.useState(1);
    const APIkey = process.env.REACT_APP_API_KEY;

    const onSearchChange = (event) => {
        setSearchArray([]);
        setResultsCount(0);
        setPage(1);
        setSearchInput(event.target.value);       
        // console.log('searchInput' , searchInput, searchArray);
    }

    const setResultCount = (count) => {
        setResultsCount(count);
    }

    function AddMovieArray(movies) {
        setSearchArray(searchArray => [...searchArray, ...movies]);
    }

    const selectMovie = (movieId) => {
        props.selectMovie(movieId)
    }

    const fetchAnotherPage = () => {
        fetchMovie(page+2);
        fetchMovie(page+3);
        setPage(page+2);
    }

    const fetchMovie = (part) => {
        const fetchURL = 'http://www.omdbapi.com/?apikey=' + APIkey + '&s=' + searchInput + '&page='+ part; 
        fetch(`${fetchURL}`)
            .then(response=> response.json())
            .then(movies => {if (movies.Response==='True') {
                    AddMovieArray(movies.Search)
                    if (page ===1) {setResultCount(movies.totalResults)}
                } 
            })
            .catch(err => {console.log('FETCH ERROR: ', err)});
    }

    React.useEffect(() => {
            fetchMovie(page);
            fetchMovie(page+1);
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
                        resultsCount={resultsCount}
                        fetchAnotherPage={fetchAnotherPage}
                        selectMovie={selectMovie}/>
        </React.Fragment>
        )
 }

