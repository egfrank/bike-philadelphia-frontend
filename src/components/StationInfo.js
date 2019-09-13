import React from 'react';
import  styled  from 'styled-components'

const FlexContainer = styled.div`
	display: flex;
	box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
	align-items: center;
`

const HalfFlexItem = styled.div`
	flex: 50% 2 2;
`
const FlexItem = styled.div`
	text-align: center;
`

const StationName = styled.h1`
	margin-left: 10px;
	font-size: 24px;
`

const StreetAddress = styled.p`
	margin-left: 10px
	font-size: 14px;
	font-style: italic;
`

const Numbers = styled.h3`
	font-size: 36px;
	color: #398DCD;
	margin: 0 0 0 0;
`

const Captions = styled.p`
	color: #585858;
 	margin: 0 0 0 0;
 	padding: 0px 5px 0px 5px;

`


const StationInfo = ({ id, name, addressStreet, bikesAvailable, docksAvailable }) => (
		<FlexContainer>
			<HalfFlexItem>
        	<StationName>{name}</StationName>
            <StreetAddress>{addressStreet}</StreetAddress>
            </HalfFlexItem>
            <FlexItem>
            <Numbers>{bikesAvailable}</Numbers>
            <Captions>Bikes Available</Captions>
            </FlexItem>
            <FlexItem>
            <Numbers>{docksAvailable}</Numbers>
            <Captions>Docks Available</Captions>
            </FlexItem>
        </FlexContainer>
)

export default StationInfo;