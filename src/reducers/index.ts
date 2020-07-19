import { createStore, combineReducers } from 'redux';
import def from './def';
import config from './config';

const rootReducers = combineReducers({ def, config });

export default createStore(rootReducers);
