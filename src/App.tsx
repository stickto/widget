import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import store from './reducers';
import Home from './ui/Home';
import Share from './ui/Share';
import './App.css';

const App: FC = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/share" exact component={Share} />
    </Router>
  </Provider>
);

export default App;
