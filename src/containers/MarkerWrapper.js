import { clickMarker } from '../actions'
import { connect } from 'react-redux'
import MarkerList from '../components/MarkerList'

const mapStateToProps = (state) => {
	return {
		markerArray: Object.values(state.api.stationsByID),
		selectedMarkers: state.clickedStations,
		panel: state.panel,
		distanceArray: state.distanceMatrix.distanceArray,
		latestCoordinateLookup: state.distanceMatrix.latestCoordinateLookup,
}}
const mapDispatchToProps = (dispatch) => {
	return {
		onMarkerClick: (id, isSelected) => {dispatch(clickMarker(id, isSelected))}
	}
}

const MarkerWrapper = connect(
	mapStateToProps,
	mapDispatchToProps
)(MarkerList)

export default MarkerWrapper