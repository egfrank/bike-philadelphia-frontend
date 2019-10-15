import React from 'react'
import styled from 'styled-components'

import VisibleStations from './components/VisibleStations'
import Weather from './components/Weather'
import CustomMap from './components/CustomMap'
import About from './components/About'
import StyledTitle from './components/StyledTitle'



const Nav = styled.div`
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




const App = () => (
  <div >

    <Nav>

      <StyledTitle />
         
      <Weather />
      <About  />
    </Nav>

    <BodyDiv>
    	<CustomMap  />
    	<PanelDiv >
  	     <VisibleStations />
     </PanelDiv>
    </BodyDiv>
     
  </div>
)

export default App;


