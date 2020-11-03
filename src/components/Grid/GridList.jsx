import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { removeFavourite, requestMovieDetail } from "../../actions.js";

import defaultImage from "../../assets/img/defaultimage.jpg";

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

export default function GridCardList() {

  const classes = useStyles();
  const favouriteMovies = useSelector(state => state.requestMovie.favouriteMovies);
  const dispatch = useDispatch();

  const removeFromFavourites = (imdbID) => {
      dispatch(removeFavourite(imdbID))
  }

  React.useEffect(() => {
    localStorage.setItem('FavouriteMovies', JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);
  
  return (
    <div className={classes.root}>
        <GridList cellHeight={190} 
                className={classes.gridList}
                cols={5}>
          {favouriteMovies.map((movie,key) => (
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
                                      onClick={()=> dispatch(requestMovieDetail(movie.imdbID))}
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
