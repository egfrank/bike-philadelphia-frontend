import fetch from 'cross-fetch'

// Action creators

export const REQUEST_API_DATA = 'REQUEST_API_DATA'
export const RECEIVE_API_DATA_SUCCESS = 'REQUEST_API_DATA_SUCCESS'
export const RECEIVE_API_DATA_FAILURE = 'REQUEST_API_DATA_FAILURE'

export const REQUEST_DISTANCE_MATRIX = 'REQUEST_DISTANCE_MATRIX'
export const RECEIVE_DISTANCE_MATRIX_SUCCESS = 'RECEIVE_DISTANCE_MATRIX_SUCCESS'
export const RECEIVE_DISTANCE_MATRIX_FAILURE = 'RECEIVE_DISTANCE_MATRIX_FAILURE'




function produceStationsByID(stationsFullInfomation){
	const stationsByID = {}
	for (let [id, value] of Object.entries(stationsFullInfomation) ){
		stationsByID[id] = subsetInfo(value)
	}
	return stationsByID
}

function subsetInfo(s){
  const reducedStationInfo= {
    coordinates:  [s.geometry.coordinates[1], s.geometry.coordinates[0]],
    id: s.properties.kioskId,
    name: s.properties.name,
    addressStreet: s.properties.addressStreet,
    bikesAvailable: s.properties.bikesAvailable,
    docksAvailable: s.properties.docksAvailable,
  }
  return reducedStationInfo
}

export function requestAPIData(){
	return {
		type: REQUEST_API_DATA
	}
}

export function receiveAPIData(json){
	return {
		type: RECEIVE_API_DATA_SUCCESS,
		bikeTimestamp: json.timestamp,
		stationsByID: produceStationsByID(json.stations),
		weather: json.weather,
	}
}

export function fetchAPIData(){
	return (dispatch) => {
	dispatch(requestAPIData);
	return fetch('https://bike-philly.herokuapp.com/api/v1/stations')
	  .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(receiveAPIData(json)))
  }
}


export function requestDistanceMatrix(coordinatesToLookUp) {
	return {
		type: REQUEST_DISTANCE_MATRIX,
		latestCoordinateLookup: coordinatesToLookUp,
	}
}

function getCoordinateReference(stationsByID){
	return Object.entries(stationsByID)
				 .map(([id, data]) => [id, data.coordinates]);
}

function zip(arr1, arr2){
	// assumes they are the same length
	let newArr = []
	for (let i=0; i<arr1.length; i++){
		newArr.push([arr1[i], arr2[i]]);
	}
	return newArr
}

function getClosestStationCoordinates(ids, lookup){
	return ids.map(x => lookup[x].coordinates)
}


export function fetchDistanceMatrix(coordinatesToLookUp){
	return (dispatch, getState) => {
		dispatch(requestDistanceMatrix(coordinatesToLookUp));
		let stationsByID = getState().api.stationsByID
		let coordinateReference = getCoordinateReference(stationsByID);
		let estimatedDistances = estimateClosestCoordinates(coordinatesToLookUp, coordinateReference)
		
		// Get closest 24 stations
		let closestStationIDs = estimatedDistances.slice(0,24).map(x => x[0]);
		console.log(JSON.stringify(closestStationIDs));

		let closestStationCoordinates = getClosestStationCoordinates(closestStationIDs, stationsByID);
		console.log(JSON.stringify(closestStationCoordinates));

		// Append coordinates to lookup to front
		let coordinateArray = [coordinatesToLookUp, ...closestStationCoordinates];
		console.log(JSON.stringify(coordinateArray));

		return fetch(constructDistanceMatrixURL(coordinateArray))
				.then(
					response => response.json(),
					error => console.log('An error occurred.', error)
				)
				.then(json => {
					console.log(JSON.stringify(json))
					let sortedDistanceArray = zip(closestStationIDs, json.distances[0].slice(1))
										 		.sort((a, b) => ( a[1] - b[1] )).slice(0,5);
					dispatch(receiveDistanceMatrix(sortedDistanceArray, stationsByID));
				})

		}
}

export function receiveDistanceMatrix(distanceArray, stationsByID) {
	let allCoordinates = distanceArray.map( x => stationsByID[x[0]].coordinates)
	let maxLat = Math.max(...allCoordinates.map(x => x[0]))
	let maxLong = Math.max(...allCoordinates.map(x => x[1]))
	let minLat = Math.min(...allCoordinates.map(x => x[0]))
	let minLong = Math.min(...allCoordinates.map(x => x[1]))

	// console.log(maxLat)
	// console.log(maxLong)
	// console.log(minLat)
	// console.log(minLong)
	let bounds = [
		[maxLat, maxLong],
		[minLat, minLong]
	]
	return {
		type: RECEIVE_DISTANCE_MATRIX_SUCCESS,
		distanceArray,
		bounds,
	}
}


let ACCESS_TOKEN = 'pk.eyJ1IjoiZWxsaW90Z2ZyYW5rIiwiYSI6ImNqd3V4aXFzZTBkMjA0YW4xNGFwNnU4cWwifQ.BsUA_68pUHaCU7v4PCKLKw'



export function constructDistanceMatrixURL(coordinateArray){

	let url = 'https://api.mapbox.com/directions-matrix/v1/mapbox/walking/'
	let esc = encodeURIComponent;
	url += coordinateArray.map(c => `${c[1]},${c[0]}`).join(';')

	let params = {
		annotations: 'distance',
		access_token: ACCESS_TOKEN
	}
	let query = Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');

	url += '?';
	url += query;

	return url
}



function toRadians(num){
	return num * (Math.PI/180);
}

function calcHaversineDist(coord1, coord2){
	let lat1 = coord1[0],
		lon1 = coord1[1],
		lat2 = coord2[0],
		lon2 = coord2[1];
	let R = 6371e3; // metres
	let φ1 = toRadians(lat1);
	let φ2 = toRadians(lat2);
	let Δφ = toRadians(lat2-lat1);
	let Δλ = toRadians(lon2-lon1);
	let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	let d = R * c;
	return d
}

function estimateClosestCoordinates(searchCoordinate, coordinateObject){
	let distanceArray = []
	for (let [id, stationCoordinate] of coordinateObject){
		let d = calcHaversineDist(searchCoordinate, stationCoordinate);
		distanceArray.push([id, d])
	}
	return distanceArray.sort((a, b) => ( a[1] - b[1] ))
}

