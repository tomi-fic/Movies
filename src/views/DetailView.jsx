import React from "react";
import {connect} from 'react-redux';

import DetailCard from '../components/Card/DetailCard.jsx'

const mapStateToProps = state => {
    return {
      selectedMovie: state.requestMovie.selectedMovie,
    }
  }

function DetailView (props) {
    return  props.selectedMovie.length < 1 
        ? <h1>No movie selected</h1>
        : (<div>
                <DetailCard/> 
           </div>)
 }

 export default connect(mapStateToProps, null)(DetailView);