const initialState = {
    searchField: '',
}

export const searchMovie = (state=initialState, action={}) => {
    switch(action.type){
        case 'CHANGE_SEARCH_FIELD':
            return Object.assign({}, state, {searchField: action.payload})
        default: 
            return state; 
    }
}

const getInitialFavouriteState = () => {
    return localStorage.getItem("FavouriteMovies") 
        ? JSON.parse(localStorage.getItem("FavouriteMovies"))
        : []
}

const initialStateRequest = {
    isPending: false,
    searchMoviesArray: [],
    selectedMovie: [],
    favouriteMovies: getInitialFavouriteState(),
    error: '',
    resultsCount: 0,
    page: 1,
}

export const requestMovie = (state=initialStateRequest, action={}) => {
    switch(action.type){
        case 'REQUEST_PENDING':
            return { ...state, isPending: true }
        case 'REQUEST_SUCCESS':
            return {...state, searchMoviesArray: [...state.searchMoviesArray, ...action.payload],
                            isPending: false,
                            error: '',
                            resultsCount: action.resultsCount}
        case 'REQUEST_FAILED':
            return Object.assign({}, state, { error: action.payload, 
                                              isPending: false })
        case 'REQUEST_DETAIL_PENDING':
            return { ...state, isPending: true }
        case 'REQUEST_DETAIL_SUCCESS':
            return {...state, selectedMovie: [action.payload],
                            isPending: false,
                            error: ''}
        case 'REQUEST_DETAIL_FAILED':
            return Object.assign({}, state, { error: action.payload, 
                                                isPending: false })
        case 'RESET_SEARCH_ARRAY':
            return Object.assign({}, state, { searchMoviesArray: [],
                                              resultsCount: 0,
                                              page: 1})
        case 'SET_PAGE':
            return Object.assign({}, state, { page: action.payload})  
        case 'ADD_TO_FAVOURITES' :
            return {...state, favouriteMovies: [...state.favouriteMovies, state.selectedMovie[0] ]}
        case 'REMOVE_FROM_FAVOURITES':
            if (state.favouriteMovies.length === 1) {localStorage.removeItem('FavouriteMovies')}
            return {...state, favouriteMovies: 
                [ ...state.favouriteMovies.filter(movie => movie.imdbID !== (action.payload ? action.payload : state.selectedMovie[0].imdbID ))]}               
        default: 
            return state; 
    }
}
