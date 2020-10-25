import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';

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

export default function DetailCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.movie.Poster}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs={9} container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                    {props.isAddedToFavourites() 
                        ? <Tooltip title="Remove from favourites" placement="top" arrow>
                            <StarIcon onClick={()=> {props.removeFromFavourites()}}/>
                          </Tooltip>
                        : <Tooltip title="Add to favourites" placement="top" arrow>
                            <StarBorderIcon onClick={()=> {props.addToFavourites()}}/>
                          </Tooltip>
                    }
                    {props.movie.Title}
                </Typography>
                <Typography variant="body2" >
                    {props.movie.Genre}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {props.movie.Country}, {props.movie.Year}, {props.movie.Runtime}
                </Typography>
                <Typography variant="body2" >
                    Director: {props.movie.Director}
                </Typography>
                <Typography variant="body2">
                    Actors: {props.movie.Actors}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Author: {props.movie.Writer}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {props.movie.Plot}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item xs={3} container direction="column" spacing={0}>
                <Grid item xs>
                    {props.movie.Ratings.map((rating, key) => {
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
