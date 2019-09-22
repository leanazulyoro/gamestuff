import React, { useContext } from 'react';
import Tile from './Tile';
import { GameContext } from './Game';



const World = ({grid, rows}) => {
  const {config} = useContext(GameContext);
  const getTemplateRowsFromNum = (num) => {
    return `${config.tileWidth}px `.repeat(num);
  };
  const style = {
    display: 'grid',
    gridTemplateRows: getTemplateRowsFromNum(grid.y),
    gridTemplateColumns: getTemplateRowsFromNum(grid.x),
  };

  return (
    <div className="world" style={style}>
      {rows.map(row => {
        return row.tiles.map(tile => {
          return (
            <Tile size={config.tileWidth} key={tile.key} />
          )
        })
      })}
    </div>
  );
};



export default World;
