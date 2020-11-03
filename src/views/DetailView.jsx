import React from "react";
import {useSelector} from 'react-redux';
import DetailCard from '../components/Card/DetailCard.jsx'

export default function DetailView () {
  return useSelector(state => state.requestMovie.selectedMovie).length < 1 
      ? <h1>No movie selected</h1>
      : (<div>
              <DetailCard/> 
          </div>)
}
