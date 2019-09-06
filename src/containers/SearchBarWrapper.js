import { connect } from 'react-redux'
import React from 'react';
import { fetchDistanceMatrix } from '../actions'

class SearchBar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			input: ''
		}
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}
	

	handleChange(event){
		this.setState({
    		input: event.target.value
    	});
	}


	handleSubmit(){
		let coordinateSubmission = this.state.input.split(',').map(x => +x);
		this.props.searchForDistanceMatrix(coordinateSubmission)
	}

	render() {
		return (
			<div>
				<input
				value={this.state.input}
				onChange={this.handleChange}
				style={{border: '1px solid black'}}/><br/>
				<button onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}




const mapStateToProps = (state) => {
  return {
  		distanceArray: state.distanceMatrix.distanceArray
  	}
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchForDistanceMatrix: (coordinatesToLookUp) => {
      	dispatch(fetchDistanceMatrix(coordinatesToLookUp))
    }
  }
};
 

const SearchBarWrapper = connect(mapStateToProps, mapDispatchToProps)(SearchBar);


