const APIkey = process.env.REACT_APP_API_KEY;

export const setSearchField = (text) => ({
    type: 'CHANGE_SEARCH_FIELD',
    payload: text
});

export const resetSearchArray = () => ({
    type: 'RESET_SEARCH_ARRAY'
});

export const setPage = (increment) => ({
    type: 'SET_PAGE',
    payload: increment
});

export const addFavourite = () => ({
    type: 'ADD_TO_FAVOURITES'
})

export const removeFavourite = (imdbID) => ({
    type: 'REMOVE_FROM_FAVOURITES',
    payload: imdbID    
})

export const requestMovie = (searchField, page) => (dispatch) => {
    const fetchURL = 'http://www.omdbapi.com/?apikey=' + APIkey + '&s=' + searchField + '&page='+ page; 
    dispatch({type: 'REQUEST_PENDING'});
    fetch(`${fetchURL}`)
        .then(response=> response.json())
            .then(movies => { if (movies.Response==='True') {
                dispatch({ type: 'REQUEST_SUCCESS',
                            payload: movies.Search,
                            resultsCount: movies.totalResults
                          })
                    } 
                    else {dispatch({ type: 'EMPTY_REQUEST_SUCCESS'})}
                })
            .catch(error => dispatch({type: 'REQUEST_FAILED',
                                  payload: error}))
};

export const requestMovieDetail = (movieId) => (dispatch) => {
    const fetchURL = 'http://www.omdbapi.com/?apikey=' + APIkey + '&i=' + movieId + '&plot=full'; 
    dispatch({type: 'REQUEST_DETAIL_PENDING'});
    fetch(`${fetchURL}`)
        .then(response=> response.json())
        .then(movie => {
            dispatch({ type: 'REQUEST_DETAIL_SUCCESS',
                       payload: movie
                    })
        })  
        .catch(error => dispatch({type: 'REQUEST_DETAIL_FAILED',
                                  payload: error}))
};
