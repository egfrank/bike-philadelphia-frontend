import React from 'react';
import { connect } from 'react-redux'

import Marker from '../components/Marker'


const SearchMarkers = ( {markerArray, distanceArray, latestCoordinateLookup} ) => {

	let activeMarkerIDs = distanceArray.map(x => +x[0])
	let markerList = markerArray.map(m => <Marker {...m} 
										key={m.id} 
										active={activeMarkerIDs.includes(m.id)}
										searched={false}/>)

	let searchedMarker = latestCoordinateLookup.length > 0 ? <Marker 
							key='searched'
							coordinates={latestCoordinateLookup}
							onClick={() => null}
							name={latestCoordinateLookup}
							active={false}
							searched={true}
						/>
						: null;
	return [searchedMarker, ...markerList]
}

export const MarkerList = (props) => {
	let markerList = <SearchMarkers {...props} />
	return (<div>{markerList}</div>)
}


const mapStateToProps = (state) => {
	return {
		markerArray: Object.values(state.api.stationsByID),
		distanceArray: state.distanceMatrix.distanceArray,
		latestCoordinateLookup: state.distanceMatrix.latestCoordinateLookup,
}}

const MarkerWrapper = connect(
	mapStateToProps,
	null
)(MarkerList)

export default MarkerWrapper
