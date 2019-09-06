import { combineReducers } from 'redux'
import { CLICK_MARKER, 
		 UNCLICK_MARKER,
		 EXPLORE_PANEL,
		 CLICK_PANEL,
		 SEARCH_PANEL,
		 REQUEST_API_DATA,
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

function panel(state=EXPLORE_PANEL, action){
	switch (action.type){
		case CLICK_PANEL:
			return action.panel
		default:
			return state
	}
}

function clickedStations(state=[], action){
	switch (action.type) {
		case CLICK_MARKER:
			if ( !action.isSelected ) {
				return [...state, action.id]
			} else {
				let markerIndex = state.indexOf(action.id);
				return copyAndRemove(state, markerIndex)
			}
		default:
			return state
	}
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
}

function distanceMatrix(state=distanceMatrixDefaultState, action){
	switch (action.type){
		case RECEIVE_DISTANCE_MATRIX_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				distanceArray: action.distanceArray,
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
  panel,
  clickedStations,
  api,
  distanceMatrix,
})

export default reduceApp;


