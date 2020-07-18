import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import './App.css';

const App: FC = () => (
  <div className="App">
    <Button type="primary"> Hello, World! 111222333 </Button>
  </div>
);

export default hot(module)(App);
