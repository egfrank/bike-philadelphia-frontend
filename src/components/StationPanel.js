import React from 'react';
import StationInfo from './StationInfo'
import SearchBar from './SearchBar'
import { SEARCH_PANEL } from '../actions'



const EXPLORE_MESSAGE = 'Click on a marker to get available bike info';
const SEARCH_MESSAGE = 'Type a location to see the closest bike stations'
const LOADING_MESSAGE = 'Loading...'
const StationPanel = (props) => {

	if (props.panel === SEARCH_PANEL){
		return <SearchStations {...props} />;
	}
	return <ExploreStations {...props} />;
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

const ExploreStations = ({stationArray}) => {
	let blankMessage = null;
	if ( stationArray.length === 0) {
		blankMessage = EXPLORE_MESSAGE
	}

	return (
		<div>
			{ blankMessage && <p>{blankMessage}</p>}
			{ stationArray.map(s => <StationInfo key={s.id} {...s}/>) }
		</div>
	)
}

export default StationPanel;