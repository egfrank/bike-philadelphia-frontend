import React from 'react';
import Marker from '../components/Marker'
import { EXPLORE_PANEL, SEARCH_PANEL } from '../actions'



const MarkerList = (props) => {
	let markerList = props.panel === SEARCH_PANEL ? <SearchMarkers {...props} /> : <ExploreMarkers {...props} />
	return (<div>{markerList}</div>)
}



const ExploreMarkers  = ( {markerArray, selectedMarkers, onMarkerClick} ) => {
	return (
		markerArray.map( m => <Marker {...m} 
										key={m.id} 
										onClick={() => {console.log(m); 
														onMarkerClick(m.id, selectedMarkers.includes(m.id))}
												}
										active={selectedMarkers.includes(m.id)}/>)
	)
}

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

export default MarkerList