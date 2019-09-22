import React from 'react';
import './App.css';
import Game from './Game';
import level1 from './level1';
import level2 from './level2';


const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

function App() {
  return (
    <div className="App" style={style}>
      <Game level={level2} />
    </div>
  );
}

export default App;
