import React from 'react'
import PanelTabLink from '../containers/PanelTabLink'
import { EXPLORE_PANEL, SEARCH_PANEL } from '../actions'

const PanelBar = () => (
	<p>
		<PanelTabLink panel={EXPLORE_PANEL}>EXPLORE</PanelTabLink>
		{', '}
	    <PanelTabLink panel={SEARCH_PANEL}>SEARCH</PanelTabLink>
  	</p>
)

export default PanelBar
