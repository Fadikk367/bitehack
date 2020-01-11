import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Header from './Header';
import Toolbar from './Toolbar';
import '../styles/App.scss';

function App() {
  return (
    <div className="App">
      <header>
        {<Header />}
      </header>
      <main>
        <aside>
          {<Menu />}
        </aside>
        <section className="page">
          {<Toolbar />}
          {<Dashboard />}
        </section>
      </main>
    </div>
  );
}

export default App;
