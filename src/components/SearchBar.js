import { connect } from 'react-redux'
import React from 'react';
import { debounce } from "throttle-debounce";
import { fetchDistanceMatrix } from '../actions'

const ACCESS_TOKEN = 'pk.eyJ1IjoiZWxsaW90Z2ZyYW5rIiwiYSI6ImNqd3V4aXFzZTBkMjA0YW4xNGFwNnU4cWwifQ.BsUA_68pUHaCU7v4PCKLKw'

function constructSearchUrl(searchTerm){
	let params = {
		bbox: '-75.22399,39.88994,-75.12994,39.99179',
		access_token: ACCESS_TOKEN
	}
	let esc = encodeURIComponent;
	let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
	url += `${esc(searchTerm)}.json`;
	let query = Object.keys(params)
		.map(k => esc(k) + '=' + esc(params[k]))
		.join('&');
	url += '?'
	url += query;

	return url
}


class AutoComplete extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    	 q: "", 
    	 searchResults: [],
       hoverResult: -1,
	};
    this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);
    this.incrementHover = this.incrementHover.bind(this)
    this.decrementHover = this.decrementHover.bind(this)
    this.handleKeyStroke = this.handleKeyStroke.bind(this)
  }

  handleKeyStroke(event){
    if (event.key === 'ArrowDown'){
      event.preventDefault()
      this.incrementHover()
    } else if (event.key === 'ArrowUp'){
      event.preventDefault()
      this.decrementHover()
    } else if (event.key === 'Enter'){
      event.preventDefault()
      this.handleEnter()
    }
  }

  submitResult = index => {
    let location = this.state.searchResults[index]
    console.log(location.geometry.coordinates)
    let [long, lat] = location.geometry.coordinates.map(x => +x)
    // Why tf is it like this
    this.props.searchForDistanceMatrix([lat, long])
  }

  handleEnter = () => {
    if ( this.state.hoverResult > -1 && this.state.hoverResult < this.state.searchResults.length){
      this.submitResult(this.state.hoverResult)
    }
  }

  clickResult = index => {
    this.submitResult(index)
  }

  incrementHover(){ 
    let h = Math.min(this.state.hoverResult+1, this.state.searchResults.length)
    this.setState({hoverResult: h})
  }

  decrementHover(){ 
    this.setState({hoverResult: this.state.hoverResult-1})
  }

  changeQuery = event => {
    this.setState({ q: event.target.value }, () => {
      this.autocompleteSearchDebounced(this.state.q);
    });
  };

  autocompleteSearch = q => {
    this.storeSearch(q);
    this.makeAutocompleteLookup(q);
  };

  makeAutocompleteLookup = q => {
    // Store the latest input here scoped in the App instance.
    this.waitingFor = q;
    fetch(constructSearchUrl(q))
    .then(response => {
      if (response.status === 200) {
        // Only bother with this XHR response
        // if this query term matches what we're waiting for.
        if (q === this.waitingFor) {
          response.json()
          .then(results => {
              this.setState({searchResults: results.features});
          })
        }
      }
    })
  }



  storeSearch = q => {
    const _searches = this.state._searches || [];
    _searches.push(q);
    this.setState({ _searches });
  }


  render() {

    const DIV_STYLE = {
      width: '300px',
    }
    
   
    const INPUT_STYLE = {
      width: '100%',
      fontSize: 20,
      padding: 4,
      boxSizing: 'border-box',
      border: '1px solid black',
    }

    const results = [];
    for (let i=0; i<this.state.searchResults.length; i++){
      let r = this.state.searchResults[i];


      results.push(
          <SearchResult 
            key={r.id}
            info={r}
            active={i === this.state.hoverResult}
            index={i}
            clickResult={this.clickResult}
          />
      )
    }
    return (
      <div style={DIV_STYLE}>
        <input
          placeholder="Search... "
          type="text"
          value={this.state.q}
          onChange={this.changeQuery}
          onKeyDown={event => this.handleKeyStroke(event)}
          style={INPUT_STYLE}
        />
        { results && 
          <div style={{
              borderBottom: '1px solid black',
              borderLeft: '1px solid black',
              borderRight: '1px solid black'
          }}>
          {results}
          </div>
        }
      </div>
    );
  }
}

class SearchResult extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.clickResult(this.props.index)
  }

  render(){
    const info = this.props.info
    const name = info.text
    const address = info.properties.address
    const style = {
      backgroundColor: this.props.active ? '#e9e9e9' : 'white',
      fontSize: 16,
      padding: 4

    }
    return (
      <div style={style} onClick={() => this.handleClick()}>
        <b>{name}</b> {address}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchForDistanceMatrix: (coordinatesToLookUp) => {
        dispatch(fetchDistanceMatrix(coordinatesToLookUp))
    }
  }
};
 

const SearchBar = connect(null, mapDispatchToProps)(AutoComplete);


export default SearchBar;
