import React from 'react'
import { connect } from 'react-redux'

import L from 'leaflet';
import { Map as ReactMap, TileLayer } from 'react-leaflet'
import MarkerWrapper from '../containers/MarkerWrapper'


const mapAccessToken = `pk.eyJ1IjoiZWxsaW90Z2ZyYW5rIiwiYSI6ImNqd3V4aXFzZTBkMjA0YW4xNGFwNnU4cWwifQ.BsUA_68pUHaCU7v4PCKLKw`
const id = 'mapbox.streets';
const mapboxURL = `https://api.tiles.mapbox.com/v4/${id}/{z}/{x}/{y}.png?access_token=${mapAccessToken}`

const DEFAULT_POSITION = [39.958482, -75.142813];
const DEFAULT_ZOOM = 12.5;

const MAP_STYLE = {
    height: 600,
}


class BaseMap extends React.Component{
  render() {

    return (
    <ReactMap 
      style={MAP_STYLE} 
      bounds={ this.props.bounds }
      boundsOptions={{padding: [100, 100]}}
    >
      <TileLayer
                url={mapboxURL}
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
       <MarkerWrapper />
    </ReactMap>

    )
  }
}



const getFartherStationCoordinates = function (stationsByID, distanceArray){
	return stationsByID[distanceArray[distanceArray.length-1][0]]
};


const mapStateToProps = (state) => {
	return {
		bounds: state.distanceMatrix.bounds
}}

const CustomMap = connect(
	mapStateToProps,
	null
)(BaseMap)


export default CustomMap