import React, { useCallback, useEffect, useState } from 'react';
import World from './World';
import CharLayer from './CharLayer';

const gameStyle = {
  position: 'relative',
};

export const GameContext = React.createContext();

const Game = ({level}) => {

  const [activeLayer, setActiveLayer] = useState('char');
  const [command, setCommand] = useState();

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;
    switch (keyCode) {
      case 87:
      case 38:
        setCommand('up');
        break;
      case 68:
      case 39:
        setCommand('right');
        break;
      case 83:
      case 40:
        setCommand('down');
        break;
      case 65:
      case 37:
        setCommand('left');
        break;
    }
  }, []);

  const handleUserKeyUnpress = useCallback(() => {
    setCommand();
  }, []);


  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    window.addEventListener('keyup', handleUserKeyUnpress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
      window.removeEventListener('keyup', handleUserKeyUnpress);
    };
  }, [handleUserKeyPress]);

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
