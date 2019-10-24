import React from 'react';
import './App.css';
import Game from './components/Game';
import levels from './levels';


const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

function App() {
  return (
    <div className="App" style={style}>
      <Game level={levels[4]} />
    </div>
  );
}

export default App;
