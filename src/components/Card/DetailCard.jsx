import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import { addFavourite, removeFavourite } from "../../actions.js";

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    // maxWidth: 500,
  },
  image: {
    width: 'auto',
    height: 350,
    display: "flex",
    justifyContent: "flex-start",
    marginRight: "10px"
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function DetailCard() {

  const selectedMovie = useSelector(state => state.requestMovie.selectedMovie[0]);
  const favouriteMovies = useSelector(state => state.requestMovie.favouriteMovies);
  const dispatch = useDispatch();

  const checkIfFavourite = () => {
    let isFavourite = false;  
    favouriteMovies.map((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {isFavourite = true}
      return null
    })
    return isFavourite
  }

  const addToFavourites = () => {
    if (!checkIfFavourite()) {
      dispatch(addFavourite())
    }
  }

  const removeFromFavourites = () => {
    if (checkIfFavourite()) {
      dispatch(removeFavourite())
    }
  }

  const classes = useStyles();

  React.useEffect(() => {
    localStorage.setItem('FavouriteMovies', JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={selectedMovie.Poster}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={9} container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                    {checkIfFavourite()
                        ? <Tooltip title="Remove from favourites" placement="top" arrow>
                            <StarIcon onClick={()=> {removeFromFavourites()}}/>
                          </Tooltip>
                        : <Tooltip title="Add to favourites" placement="top" arrow>
                            <StarBorderIcon onClick={()=> {addToFavourites()}}/>
                          </Tooltip>
                    }
                    {selectedMovie.Title}
                </Typography>
                <Typography variant="body2" >
                    {selectedMovie.Genre}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {selectedMovie.Country}, {selectedMovie.Year}, {selectedMovie.Runtime}
                </Typography>
                <Typography variant="body2" >
                    Director: {selectedMovie.Director}
                </Typography>
                <Typography variant="body2">
                    Actors: {selectedMovie.Actors}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Author: {selectedMovie.Writer}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {selectedMovie.Plot}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} container direction="column" spacing={0}>
                <Grid item xs>
                    {selectedMovie.Ratings.map((rating, key) => {
                        return <div className="rating" 
                                    key={key}>
                            <div style={{"display": 'flex',
                                      'alignItems': 'center'}} 
                                  key={rating.Source+'src'}> 
                                {rating.Source} :
                            </div> 
                            <div style={{"fontSize":"20px"}} 
                                  key={rating.Source+'val'}> 
                                {rating.Value} 
                            </div> 
                            </div>
                        })
                    }                  
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}