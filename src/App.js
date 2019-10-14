import React from 'react'
import VisibleStations from './containers/VisibleStations'
import Weather from './components/Weather'
import CustomMap from './components/CustomMap'
import About from './components/About'


const NAV_STYLE = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
}


const BODY_STYLE = {
    display: 'flex',
}

const PANEL_STYLE = {
    width: '30%',
}




const App = () => (
  <div >

    <div style={NAV_STYLE}>
      <h1 className="title" 
      style={{
        marginRight: 'auto',
        marginLeft: '10px'
      }}><span role="img" aria-label="bike">🚴‍♀️</span> Bike Philadelphia </h1>
      <Weather />
      <About style={{ alignSelf: 'center', margin: '0 50px 0 50px'}} />
    </div>

    <div style={BODY_STYLE}>
    	<CustomMap  />
    	<div style={PANEL_STYLE}>
  	     <VisibleStations />
     </div>
    </div>
     
  </div>
)

export default App;


