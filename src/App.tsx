import React, { FC } from 'react';
// import { hot } from 'react-hot-loader';
import Home from './ui/Home';
import './App.css';

const App: FC = () => (
  <div className="App">
    <Home />
  </div>
);

export default App; //hot(module)(App);
