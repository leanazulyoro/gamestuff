import React from 'react';
import './App.css';
import Game from './components/Game';
import level1 from './levels/level1';
import level2 from './levels/level2';
import level3 from './levels/level3';
import useTic from './hooks/tic';


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
