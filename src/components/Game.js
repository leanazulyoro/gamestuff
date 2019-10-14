import React, { useEffect, useState } from 'react';
import World from './World';
import CharLayer from './CharLayer/CharLayer';
import KeyboardController from '../helpers/keyboardController';
import useTic from '../hooks/tic';
import * as shortid from 'shortid';

const gameStyle = {
  position: 'relative',
};

export const GameContext = React.createContext();

const TIC_TIMEOUT = 300;

const Game = ({level}) => {

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

  return (
    <GameContext.Provider value={{
      tic,
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
