import { connect } from 'react-redux'
import StationPanel from '../components/StationPanel'

const getVisibleStations = function (stationsByID, distanceArray){
	return distanceArray.map( x => stationsByID[x[0]])
};

const mapStateToProps = state => {
	return {  
		stationArray: getVisibleStations(state.api.stationsByID, 
										 state.distanceMatrix.distanceArray,
										 ),
		distMatrixLoading: state.distanceMatrix.isFetching
	}
};

const VisibleStations = connect(
	mapStateToProps,
	null
)(StationPanel);

export default VisibleStations