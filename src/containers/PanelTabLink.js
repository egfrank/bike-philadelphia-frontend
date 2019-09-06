import { connect } from 'react-redux'
import { clickPanel } from '../actions'
import PanelTab from '../components/PanelTab'

const mapStateToProps = (state, ownProps) => {
	return {
		active: ownProps.panel === state.panel
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(clickPanel(ownProps.panel))
		}
	}
}


const PanelTabLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(PanelTab)

export default PanelTabLink 