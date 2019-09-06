import StationPanel from '../components/StationPanel'
import { connect } from 'react-redux'
import { EXPLORE_PANEL, SEARCH_PANEL } from '../actions'

const getVisibleStations = function (stationsByID, selectedStations, distanceArray, panel){
	switch (panel) {
		case EXPLORE_PANEL:
			return selectedStations.map( sID => stationsByID[sID] )

		case SEARCH_PANEL:
		default:
			return distanceArray.map( x => stationsByID[x[0]])
	}
};

const mapStateToProps = state => {
	return {  
		stationArray: getVisibleStations(state.api.stationsByID, 
										 state.clickedStations, 
										 state.distanceMatrix.distanceArray,
										 state.panel),
		panel: state.panel,
		distMatrixLoading: state.distanceMatrix.isFetching
	}
};

const VisibleStations = connect(
	mapStateToProps,
	null
)(StationPanel);

export default VisibleStations