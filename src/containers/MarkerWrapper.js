import { connect } from 'react-redux'
import MarkerList from '../components/MarkerList'

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