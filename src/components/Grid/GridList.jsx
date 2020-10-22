import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, NavLink } from "react-router-dom";

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
      <InfiniteScroll
          style={{"width":"100%"}}
          dataLength={props.searchArray.length}
          next={props.fetchAnotherPage}
          hasMore={props.resultsCount-props.searchArray.length !==0}
          loader={<h4>Loading...</h4>}
          // endMessage={
          //     <p style={{ textAlign: 'center' }}>
          //       <b>Yay! You have seen it all</b>
          //     </p>
          //   }
          > 
        <GridList cellHeight={190} 
                className={classes.gridList}
                cols={5}>
          {props.searchArray.map((movie,key) => (
              <GridListTile key={movie.imdbID} 
                  // className="buzz_effect"
                  // onClick={()=>console.log("CLIKED: ",movie.Title)}
                  >
                  <div className="img-zoom">
                      {(movie.Poster === 'N/A') 
                          ? <img src={defaultImage} alt={movie.Title} />
                          : <img src={movie.Poster} alt={movie.Title} />
                      }
                  </div>
                  <GridListTileBar
                    title={movie.Title}
                    subtitle={<span> {movie.Type.toUpperCase()} {movie.Year}</span>}
                    actionIcon={
                      <Link to={"/movies/detail"} 
                            key={movie.imdbID}>
                        <IconButton aria-label={`info about ${movie.Title}`} 
                                    className={classes.icon}
                                    onClick={()=> props.selectMovie(movie.imdbID)}>
                            <InfoIcon />
                        </IconButton>
                      </Link>  
                      }
                  />
              </GridListTile>   
          ))}
        </GridList>
      </InfiniteScroll>
    </div>
  );
}
