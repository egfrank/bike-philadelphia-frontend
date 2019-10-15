import React from 'react';
import styled from 'styled-components'

import {
  Marker as LeafletMarker,
  Popup as LeafletPopup
} from 'react-leaflet'
import { ExtraMarkers } from 'leaflet-extra-markers'




const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`


const FlexItemLeft = styled.div`
  flex-basis: 100%;
  text-align: center;
`

const FlexItemRight = styled.div`
  flex-basis: 100%
  text-align: center;
  border-left: 1px solid grey;
`


const Location = styled.h2`
   margin: 0 0 4px 0;
   font-size: 16;
`

const NumberInfo = styled.h3`
  margin: 0;
  color: #398DCD;
`

const Caption = styled.p`
  padding: 0px 10px;
  margin: 0px;
  color: #585858;
`

const Marker = ({
    name,
    bikesAvailable,
    docksAvailable,
    coordinates,
    onClick,
    active,
    searched
  }) => {

  let icon = defaultIcon;
  if ( !!active ) {
     icon = selectedIcon;
  } else if ( !!searched ) {
     icon = searchIcon;
  }

  return (

  <LeafletMarker 
    position={coordinates}
    onClick={onClick}
    icon = { icon }
  >
    <LeafletPopup className={'custom-popup'}>
      <Location>{name}</Location>
      <FlexContainer>
        <FlexItemLeft>
          <NumberInfo>{bikesAvailable}</NumberInfo>
          <Caption>bikes</Caption>
        </FlexItemLeft>

        <FlexItemRight>
          <NumberInfo>{docksAvailable}</NumberInfo>
          <Caption>docks</Caption>
        </FlexItemRight>

      </FlexContainer>

     </LeafletPopup>
  </LeafletMarker>
  )
}

export default Marker


const defaultIcon = ExtraMarkers.icon({
    icon: 'fa-circle',
    markerColor: 'blue',
    shape: 'circle',
    prefix: 'fa'
  });

const selectedIcon = ExtraMarkers.icon({
    icon: 'fa-star',
    markerColor: 'cyan',
    shape: 'circle',
    prefix: 'fa'
  });

const searchIcon = ExtraMarkers.icon({
    icon: 'fa-search',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
  });
