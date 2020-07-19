import { createStore, combineReducers } from 'redux';
import config from './config';

const rootReducers = combineReducers({ config });

export default createStore(rootReducers);
