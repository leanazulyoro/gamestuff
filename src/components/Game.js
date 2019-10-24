import React, { useEffect, useState } from 'react';
import World from './World';
import CharLayer from './CharLayer/CharLayer';
import KeyboardController from '../helpers/keyboardController';
import * as shortid from 'shortid';
import levels from '../levels';
import useTic from '../hooks/tic';

const gameStyle = {
  position: 'relative',
};

export const GameContext = React.createContext();

export const TIC_TIMEOUT = 300;

const Game = ({level}) => {
  const [currentLevel, setCurrentLevel] = useState(level);
  const [activeLayer, setActiveLayer] = useState('char');
  const [command, setCommand] = useState({name: 'none'});
  const tic = useTic(TIC_TIMEOUT);

  useEffect(() => {
    KeyboardController(
      {
        38: function() { setCommand({id: shortid.generate(), name: 'up'}); },
        87: function() { setCommand({id: shortid.generate(), name: 'up'}); },

        39: function() { setCommand({id: shortid.generate(), name: 'right'}); },
        68: function() { setCommand({id: shortid.generate(), name: 'right'}); },

        40: function() { setCommand({id: shortid.generate(), name: 'down'}); },
        83: function() { setCommand({id: shortid.generate(), name: 'down'}); },

        37: function() { setCommand({id: shortid.generate(), name: 'left'}); },
        65: function() { setCommand({id: shortid.generate(), name: 'left'}); },
      },
      TIC_TIMEOUT,
      () => {
        setCommand({id: shortid.generate(), name: 'none'})
      }
    );
  }, []);

  const handleAfterMove = (tile) => {
    if(tile.action) {
      switch(tile.action.type) {
        case 'teleport':
          const newLevel = levels[tile.action.to];
          setCurrentLevel(newLevel);
      }
    }
  };

  return (
    <GameContext.Provider value={{
      tic,
      level: currentLevel,
      activeLayer,
      command,
      config: {
        tileWidth: 32,
      }
    }}>
      <div className="game" style={gameStyle}>
        <World grid={currentLevel.grid} rows={currentLevel.rows} />
        <CharLayer grid={currentLevel.grid} rows={currentLevel.rows} afterMove={handleAfterMove} />
        <span>{currentLevel.name}</span>
      </div>
    </GameContext.Provider>
  )
};

export default Game;
