import React from 'react'

import styled from 'styled-components'


const Title = ({className}) => (
  <h1 className={className}>
    <span role="img" aria-label="bike">🚴‍♀️</span> Bike Philadelphia
  </h1>
)

const StyledTitle = styled(Title)`
    margin-right: auto;
    margin-left: 10px;
    font-family: 'Oleo Script Swash Caps', cursive;
    font-size: 30px;
`;

export default StyledTitle;