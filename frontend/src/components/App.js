import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <Menu />
      <Dashboard />
    </div>
  );
}

export default App;
