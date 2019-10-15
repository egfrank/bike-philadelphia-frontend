import React from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux'


const WeatherDiv = styled.div`
	align-items: center;
	background: white;
	display: flex;
	justify-content: space-between;
	border: 0.5px solid #F0F0F0;
	border-radius: 20px;
	width: 100px;
	height: 60px;
`
const Temperature = styled.h3`
	margin-left: 10px;
	text-align: center;
`

const BaseWeather = ({ temp, imgUrl }) => (
	<WeatherDiv>
		<Temperature>{temp}</Temperature>
		<img src={imgUrl}  alt="weather icon"></img>
	</WeatherDiv>
)



const createIconImgUrl = (icon) => (
	`http://openweathermap.org/img/w/${icon}.png`
)

const convertKtoF = (kelvin) => (
	Math.round(9 /  5 * (kelvin - 273) + 32, 2)
)


const mapStateToProps = (state) => {
	let weather = state.api.weather;
	if ( weather.hasOwnProperty('main') ){
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

// What is this doing, going from the particular weather in state to the format we need in the component, should actually be done by a selector

const Weather = connect(mapStateToProps, null)(BaseWeather);

export default Weather;
