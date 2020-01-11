import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import '../styles/App.css';
import Temp from './Temp';

function App() {
  return (
    <div className="App">
      <Temp />
    </div>
  );
}

export default App;
