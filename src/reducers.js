import { combineReducers } from 'redux'
import { REQUEST_API_DATA,
		 RECEIVE_API_DATA,
		 RECEIVE_API_DATA_SUCCESS,
		 REQUEST_DISTANCE_MATRIX,
		 RECEIVE_DISTANCE_MATRIX_SUCCESS,
		 RECEIVE_DISTANCE_MATRIX_FAILURE} from './actions'

// UI Reducers

function copyAndRemove(array, index){
	// Copies an array without the element at the index provided
	return [...array.slice(0,index), ...array.slice(index+1)]
}

const apiDefaultState = {
	isFetching: false,
	bikeTimestamp: null,
	stationsByID: {},
	weather: {}
}

function api(state=apiDefaultState, action){
	switch (action.type){
		case REQUEST_API_DATA:
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_API_DATA_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				bikeTimestamp: action.bikeTimestamp,
				stationsByID: action.stationsByID,
				weather: action.weather,
			})
		default:
			return state
	}
}

const distanceMatrixDefaultState = {
	isFetching: false,
	distanceArray: [],
	latestCoordinateLookup: [],
	bounds: [[39.99179, -75.22399], [39.88994, -75.12994]],
}

function distanceMatrix(state=distanceMatrixDefaultState, action){
	switch (action.type){
		case RECEIVE_DISTANCE_MATRIX_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				distanceArray: action.distanceArray,
				bounds: action.bounds
			})

		case REQUEST_DISTANCE_MATRIX:
			return Object.assign({}, state, {
				isFetching: true,
				latestCoordinateLookup: action.latestCoordinateLookup,
			})

		case RECEIVE_DISTANCE_MATRIX_FAILURE:
		default:
			return state
	}
}


const reduceApp = combineReducers({
  api,
  distanceMatrix,
})

export default reduceApp;


