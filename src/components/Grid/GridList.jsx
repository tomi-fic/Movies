import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { removeFavourite, requestMovieDetail, setSearchField } from "../../actions.js";

import defaultImage from "../../assets/img/defaultimage.jpg";

const mapStateToProps = state => {
  return {
    favouriteMovies : state.requestMovie.favouriteMovies,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    onRemoveFavourite: (imdbID) => dispatch(removeFavourite(imdbID)),
    onSelectMovie: (movieId) => {
      dispatch(requestMovieDetail(movieId))
      dispatch(setSearchField(''))
    }
  } 
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: '15px',
    padding: '5px'
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  tile: {
    padding: '15px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  removeicon: {
    color: 'rgba(255, 255, 255, 0.54)', 
    zIndex:'99',
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
}));

function GridCardList(props) {
  const classes = useStyles();

  const removeFromFavourites = (imdbID) => {
      props.onRemoveFavourite(imdbID)
  }

  React.useEffect(() => {
    localStorage.setItem('FavouriteMovies', JSON.stringify(props.favouriteMovies));
  }, [props.favouriteMovies]);
  
  return (
    <div className={classes.root}>
        <GridList cellHeight={190} 
                className={classes.gridList}
                cols={5}>
          {props.favouriteMovies.map((movie,key) => (
              <GridListTile key={movie.imdbID}>
                <div>
                  <Tooltip title="Remove from favourites" placement="bottom" arrow>
                    <RemoveCircleIcon className={classes.removeicon}
                          onClick={()=> removeFromFavourites(movie.imdbID)}/>
                  </Tooltip>
                  <div className="img-zoom">
                      {(movie.Poster === 'N/A') 
                          ? <img src={defaultImage} alt={movie.Title} />
                          : <img src={movie.Poster} alt={movie.Title} />
                      }
                  </div>
                  </div>
                  <GridListTileBar
                    title={movie.Title}
                    subtitle={<span> {movie.Type.toUpperCase()} {movie.Year}</span>}
                    actionIcon={
                      <Link to={"/movies/detail"} 
                            key={movie.imdbID}>
                        <Tooltip title="Movie Detail" placement="bottom" arrow
                            PopperProps={{popperOptions:{modifiers: {offset: {enabled: true,offset: '0px, -15px'},},},}}>
                          <IconButton aria-label={`info about ${movie.Title}`} 
                                      className={classes.icon}
                                      onClick={()=> props.onSelectMovie(movie.imdbID)}
                                      >
                              <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Link>  
                      }
                  />
              </GridListTile>   
          ))}
        </GridList>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GridCardList); 
