import React from 'react';
import { Marker as LeafletMarker, Popup as LeafletPopup} from 'react-leaflet'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const POPUP_STYLE = {
  background: '#2c3e50',
  color: '#fff',
  fontSize: '16px',
  lineHeight: '24px',
}

const FLEX_CONTAINER = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}

const FLEX_ITEM_LEFT = {
  flexBasis: '100%',
  textAlign: 'center',
}

const FLEX_ITEM_RIGHT = {
  flexBasis: '100%',
  textAlign: 'center',
  borderLeft: '1px solid grey',
}

const LOCATION_NAME = {
   margin: '0 0 4px 0',
   fontSize: 16
}
const NUMBER_STYLE = {
  margin: '0 0 0 0',
  color: '#398DCD'
}

const CAPTION_STYLE = {
  padding: '0 10px 0 10px',
  margin: '0 0 0 0',

  color: '#585858',

}

const Marker = ({ name, bikesAvailable, docksAvailable, coordinates, onClick, active, searched } ) => {
  let icon = blueIcon
  if ( !!active ) {
     icon = yellowIcon;
  } else if ( !!searched ) {
     icon = greyIcon;
  }


  return (

	<LeafletMarker 
		position={coordinates}
		onClick={onClick}
		icon = { icon }
	>
		<LeafletPopup className={'custom-popup'}>
		<h3 style={LOCATION_NAME}>{name}</h3>
    <div style={FLEX_CONTAINER}>
      <div style={FLEX_ITEM_LEFT}>
      <h2 style={NUMBER_STYLE}>{bikesAvailable}</h2>
      <p style={CAPTION_STYLE}>bikes</p>

      </div>
      <div style={FLEX_ITEM_RIGHT}>
      <h2 style={NUMBER_STYLE}>{docksAvailable}</h2>
      <p style={CAPTION_STYLE}>docks</p>
      </div>

    </div>
		 </LeafletPopup>
	</LeafletMarker>
  )
}

export default Marker