import React from 'react'
import VisibleStations from './components/VisibleStations'
import Weather from './components/Weather'
import CustomMap from './components/CustomMap'
import About from './components/About'


import styled from 'styled-components'


const NavDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const BodyDiv = styled.div`
    display: flex;
`


const PanelDiv = styled.div`
    width: 30%;
    margin: 0 10px;
`

const SiteTitle = styled.div`
    margin-right: auto;
    margin-left: 10px;
    font-family: 'Oleo Script Swash Caps', cursive;
    font-size: 30px;
`

const App = () => (
  <div >

    <NavDiv>
      <SiteTitle><span role="img" aria-label="bike">🚴‍♀️</span> Bike Philadelphia </SiteTitle>
      <Weather />
      <About style={{ alignSelf: 'center', margin: '0 50px 0 50px'}} />
    </NavDiv>

    <BodyDiv>
    	<CustomMap  />
    	<PanelDiv >
  	     <VisibleStations />
     </PanelDiv>
    </BodyDiv>
     
  </div>
)

export default App;


