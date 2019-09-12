import React from 'react'
import VisibleStations from './containers/VisibleStations'
import Weather from './components/Weather'
import CustomMap from './components/CustomMap'

const PANEL_STYLE = {
    width: '100%',
    height: 200,
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
  <div >

    <div style={NAV_STYLE}>
      <h1 className="title" style={{marginRight: 'auto', marginLeft: '10px'}}> 🚴‍♀️ Bike Philadelphia </h1>
      <Weather />
      <h3 style={{ alignSelf: 'center', margin: '0 50px 0 50px'}}>About</h3>
    </div>

  	<CustomMap />

  	<div style={PANEL_STYLE}>
	     <VisibleStations />
     </div>
     
  </div>
)

export default App;


