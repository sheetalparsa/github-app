import React from 'react';
import List from './components/List';
import './App.css';

export default class App extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Github</h2>
        </header>
        <main>
          <List />
        </main>
      </div>
    );
}
}

