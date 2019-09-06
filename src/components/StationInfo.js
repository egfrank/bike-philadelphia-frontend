import React from 'react';


const StationInfo = ({ id, name, addressStreet, bikesAvailable, docksAvailable }) => (
		<div>
        	<h1>{name}</h1>
            <p>{addressStreet}</p>
            <h3>{bikesAvailable} / {docksAvailable}</h3>
        </div>
)

export default StationInfo;