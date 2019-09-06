import React from 'react'
import VisibleStations from './containers/VisibleStations'
import MarkerWrapper from './containers/MarkerWrapper'
import PanelBar from './components/PanelBar'
import Weather from './components/Weather'
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet'

const mapAccessToken = `pk.eyJ1IjoiZWxsaW90Z2ZyYW5rIiwiYSI6ImNqd3V4aXFzZTBkMjA0YW4xNGFwNnU4cWwifQ.BsUA_68pUHaCU7v4PCKLKw`
const id = 'mapbox.streets';
const mapboxURL = `https://api.tiles.mapbox.com/v4/${id}/{z}/{x}/{y}.png?access_token=${mapAccessToken}`

const DEFAULT_POSITION = [39.958482, -75.142813];
const DEFAULT_ZOOM = 12.5;

const MAP_STYLE = {
    height: 600,
    width: 900,
    position: 'absolute',
}

const PANEL_STYLE = {
    position: 'relative',
    zIndex: 10,
    width: 350,
    height: 550,
    background: '#F5F5F5',
    float: 'right',
    marginTop: 10,
    borderRadius: 10,

}

const NAV_STYLE = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
}


const App = () => (
  <div style={{width: '100%'}}>
    <div style={NAV_STYLE}>
      <h1 className="title" style={{marginRight: 'auto', marginLeft: '10px'}}> 🚴‍♀️ Bike Philadelphia </h1>
      <Weather />
      <h3 style={{ alignSelf: 'center', margin: '0 50px 0 50px'}}>About</h3>
    </div>
  	 <Map center={DEFAULT_POSITION} zoom={DEFAULT_ZOOM} style={MAP_STYLE} >
  	 <TileLayer
              url={mapboxURL}
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
     <MarkerWrapper />
     </Map>
  	 
  	 <div style={PANEL_STYLE}>
	  	 <PanelBar />
	     <VisibleStations />
     </div>
     
  </div>
)

export default App;


