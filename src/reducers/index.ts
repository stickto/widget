import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import def from './def';
import dashboard from './dashboard';

const rootReducers = combineReducers({ def, dashboard });

export default createStore(
  rootReducers,
  applyMiddleware(thunk),
);
