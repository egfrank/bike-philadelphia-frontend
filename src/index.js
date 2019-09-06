import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reduceApp  from './reducers';
import { clickMarker, clickPanel } from './actions'
import  App  from './App';
import { fetchAPIData } from './actions'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const store = createStore(reduceApp, applyMiddleware(thunkMiddleware));

store.dispatch(fetchAPIData());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);