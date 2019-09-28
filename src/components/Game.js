import React, { useCallback, useEffect, useState } from 'react';
import World from './World';
import CharLayer from './CharLayer';

const gameStyle = {
  position: 'relative',
};

export const GameContext = React.createContext();

const Game = ({level}) => {

  const [activeLayer, setActiveLayer] = useState('char');
  const [command, setCommand] = useState(null);
  const [keydown, setKeydown] = useState(false);

  const handleUserKeyPress = useCallback(event => {
    if(keydown) { return }
    setKeydown(true);

    const { keyCode } = event;
    switch (keyCode) {
      case 87:
      case 38:
        setCommand('up');
        console.log('up');
        break;
      case 68:
      case 39:
        setCommand('right');
        console.log('right');
        break;
      case 83:
      case 40:
        setCommand('down');
        console.log('down');
        break;
      case 65:
      case 37:
        setCommand('left');
        console.log('left');
        break;
    }
  }, [keydown]);

  const handleUserKeyUnpress = useCallback(() => {
    setCommand('none');
    console.log('none');
    setKeydown(false);
  }, []);


  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    window.addEventListener('keyup', handleUserKeyUnpress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      window.removeEventListener('keyup', handleUserKeyUnpress);
    };
  }, [command, handleUserKeyPress, handleUserKeyUnpress]);

  return (
    <GameContext.Provider value={{
      level,
      activeLayer,
      command,
      config: {
        tileWidth: 50,
      }
    }}>
      <div className="game" style={gameStyle}>
        <World grid={level.grid} rows={level.rows} />
        <CharLayer grid={level.grid} rows={level.rows} />
      </div>
    </GameContext.Provider>
  )
};

export default Game;
