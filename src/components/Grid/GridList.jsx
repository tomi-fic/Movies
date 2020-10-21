import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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
}));

export default function GridCardList(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={190} 
                className={classes.gridList}
                cols={5}>
        {props.searchArray.map((movie,key) => (
            <GridListTile key={movie.Title + key} className="buzz_effect">
                <div className="img-zoom">
                    {(movie.Poster === 'N/A') 
                        ? <img src={defaultImage} alt={movie.Title} />
                        : <img src={movie.Poster} alt={movie.Title} />
                    }
                    
                </div>
                <GridListTileBar
                title={movie.Title}
                subtitle={<span>Year: {movie.Year}</span>}
                actionIcon={
                    <IconButton aria-label={`info about ${movie.Title}`} className={classes.icon}>
                        <InfoIcon />
                    </IconButton>}
                />
            </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
