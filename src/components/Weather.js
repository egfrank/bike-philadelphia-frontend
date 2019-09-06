import { connect } from 'react-redux'
import React from 'react';


const WEATHER_STYLE = {
	borderRadius: 20, 
	alignItems: 'center',
	background: 'white', 
	display: 'flex', 
	justifyContent: 'space-between',
	border: '0.5px solid #F0F0F0',
	width: 100,
	height: 60
}

const BaseWeather = ({ temp, imgUrl }) => (
	<div style={WEATHER_STYLE}>
		<h3 style={{marginLeft: 10, textAlign: 'center'}}> {temp} </h3>
		<img src={imgUrl}  alt="weather icon"></img>
	</div>
)


function createIconImgUrl(icon){
  return `http://openweathermap.org/img/w/${icon}.png`
}

function convertKtoF(kelvin){
  return Math.round(9 /  5 * (kelvin - 273) + 32, 2)
}



const mapStateToProps = state => {
	let weather = state.api.weather;
	if  ( weather.hasOwnProperty('main') ){
		return {  
			temp: convertKtoF(state.api.weather.main.temp) + '\xB0',
			imgUrl: createIconImgUrl(state.api.weather.weather[0].icon),
		}
	} else {
		return {
			temp: undefined,
			imgUrl: undefined
		}
	}
};

const Weather = connect(mapStateToProps, null)(BaseWeather);

export default Weather;
