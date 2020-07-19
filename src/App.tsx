import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from './reducers';
import Home from './ui/Home';
import './App.css';

const App: FC = () => (
  <Provider store={store}>
    <div className="App">
      <Home />
    </div>
  </Provider>
);

export default App;
