import React, { useContext } from 'react';
import Tile from './Tile';
import Character from './Character';
import { GameContext } from './Game';


const CharLayer = ({grid, rows}) => {
  const {config} = useContext(GameContext);
  const getTemplateRowsFromNum = (num) => {
    return `${config.tileWidth}px `.repeat(num);
  };
  const style = {
    display: 'grid',
    gridTemplateRows: getTemplateRowsFromNum(grid.y),
    gridTemplateColumns: getTemplateRowsFromNum(grid.x),
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
