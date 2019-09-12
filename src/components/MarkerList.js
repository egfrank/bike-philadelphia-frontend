import React from 'react';
import Marker from '../components/Marker'



const MarkerList = (props) => {
	let markerList = <SearchMarkers {...props} />
	return (<div>{markerList}</div>)
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