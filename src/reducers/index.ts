import { createStore, combineReducers } from 'redux';
import def from './def';
import config from './config';
import dashboard from './dashboard';

const rootReducers = combineReducers({ def, config, dashboard });

export default createStore(rootReducers);
