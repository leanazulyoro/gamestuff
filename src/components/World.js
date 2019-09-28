import React, { useContext } from 'react';
import Tile from './Tile';
import { GameContext } from './Game';
import useGrid from '../hooks/grid';


const World = ({grid, rows}) => {
  const {config} = useContext(GameContext);

  const style = useGrid(grid, config.tileWidth);

  return (
    <div className="world" style={style}>
      {rows.map(row => {
        return row.tiles.map(tile => {
          return (
            <Tile size={config.tileWidth} key={tile.key} type={tile.type} />
          )
        })
      })}
    </div>
  );
};



export default World;
