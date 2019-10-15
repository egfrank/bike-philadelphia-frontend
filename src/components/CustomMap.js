import React from 'react'
import { connect } from 'react-redux'

import { Map as ReactMap, TileLayer } from 'react-leaflet'
import MarkerWrapper from './MarkerWrapper'

const mapAccessToken = `pk.eyJ1IjoiZWxsaW90Z2ZyYW5rIiwiYSI6ImNqd3V4aXFzZTBkMjA0YW4xNGFwNnU4cWwifQ.BsUA_68pUHaCU7v4PCKLKw`
const id = 'mapbox.streets';
const mapboxURL = `https://api.tiles.mapbox.com/v4/${id}/{z}/{x}/{y}.png?access_token=${mapAccessToken}`


const MAP_STYLE = {
    height: 600,
    width: '70%',
}


const BaseMap = ({bounds}) => {
  return (
    <ReactMap 
      style={MAP_STYLE} 
      bounds={bounds}
      boundsOptions={{padding: [100, 100]}}
    >
      <TileLayer
                url={mapboxURL}
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
      <MarkerWrapper />
    </ReactMap>
  )
}




const mapStateToProps = (state) => {
	return {
		bounds: state.distanceMatrix.bounds
}}

const CustomMap = connect(
	mapStateToProps,
	null
)(BaseMap)


export default CustomMap