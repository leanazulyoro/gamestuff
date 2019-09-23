import React, { useCallback, useContext } from 'react';
import Tile from './Tile';
import Character from './Character';
import { GameContext } from './Game';
import useGrid from '../hooks/grid';


const CharLayer = ({grid, rows}) => {
  const {config} = useContext(GameContext);
  const gridStyles = useGrid(grid, config.tileWidth);
  const style = {
    ...gridStyles,
    position: 'absolute',
    top: '-10px',
    left: 0
  };

  return (
    <div className="charLayer" style={style}>
      <Character size={config.tileWidth} />
    </div>
  );
};

export default CharLayer;
