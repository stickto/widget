import { createStore, combineReducers } from 'redux';
import def from './def';
import dashboard from './dashboard';

const rootReducers = combineReducers({ def, dashboard });

export default createStore(rootReducers);
