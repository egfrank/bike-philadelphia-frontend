import React from 'react';
import StationInfo from './StationInfo'
import SearchBar from './SearchBar'


const SEARCH_MESSAGE = 'Type a location to see the closest bike stations'
const LOADING_MESSAGE = 'Loading...'
const StationPanel = (props) => {
	return <SearchStations {...props} />;
}


const SearchStations = ({stationArray, distMatrixLoading}) => {
	let blankMessage = null;
	if ( stationArray.length === 0) {
		blankMessage = SEARCH_MESSAGE
	}

	let stations;
	if (distMatrixLoading) { 
		stations = <p>{LOADING_MESSAGE}</p>
	} else {
		stations = stationArray.map(s => <StationInfo key={s.id} {...s}/>)
	}
	return (
		<div>
			<SearchBar />
			{ blankMessage && <p>{blankMessage}</p>}
			{ stations }
		</div>
	)
}

export default StationPanel;