import React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import { addFavourite, removeFavourite } from "../../actions.js";

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const mapStateToProps = state => {
  return {
    selectedMovie: state.requestMovie.selectedMovie,
    favouriteMovies: state.requestMovie.favouriteMovies
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    onAddFavourite: () => dispatch(addFavourite()),
    onRemoveFavourite: (imdbID) => dispatch(removeFavourite(imdbID))
  } 
}


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

function DetailCard(props) {

  const checkIfFavourite = () => {
    let isFavourite = false;  
    props.favouriteMovies.map((movie) => {
      if (movie.imdbID === props.selectedMovie[0].imdbID) {isFavourite = true}
      return null
    })
    return isFavourite
  }

  const addToFavourites = () => {
    if (!checkIfFavourite()) {
      props.onAddFavourite()
    }
  }

  const removeFromFavourites = () => {
    if (checkIfFavourite()) {
      props.onRemoveFavourite()
    }
  }

  const classes = useStyles();

  React.useEffect(() => {
    localStorage.setItem('FavouriteMovies', JSON.stringify(props.favouriteMovies));
  }, [props.favouriteMovies]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.selectedMovie[0].Poster}/>
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
                    {props.selectedMovie[0].Title}
                </Typography>
                <Typography variant="body2" >
                    {props.selectedMovie[0].Genre}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {props.selectedMovie[0].Country}, {props.selectedMovie[0].Year}, {props.selectedMovie[0].Runtime}
                </Typography>
                <Typography variant="body2" >
                    Director: {props.selectedMovie[0].Director}
                </Typography>
                <Typography variant="body2">
                    Actors: {props.selectedMovie[0].Actors}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Author: {props.selectedMovie[0].Writer}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.selectedMovie[0].Plot}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} container direction="column" spacing={0}>
                <Grid item xs>
                    {props.selectedMovie[0].Ratings.map((rating, key) => {
                        return <div className="rating" key={key}>
                            <div style={{"display": 'flex','alignItems': 'center'}} key={rating.Source+'src'}> 
                                {rating.Source} :
                            </div> 
                            <div style={{"fontSize":"20px"}} key={rating.Source+'val'}> 
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard); 