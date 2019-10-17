import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import Character from '../Character';
import { GameContext, TIC_TIMEOUT } from '../Game';
import useGrid from '../../hooks/grid';
import { initialState, reducer } from './reducer';

const OFFSET = 1;

const CharLayer = ({grid, afterMove}) => {
  const {config, command, level } = useContext(GameContext);
  const gridStyles = useGrid(grid, config.tileWidth);
  const [active, setActive] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const style = {
    ...gridStyles,
    position: 'absolute',
    top: '-10px',
    left: 0,
  };

  const selectCharacter = (id) => {
    return state.find(char => char.id === id);
  };

const getNextTile = (direction, {x, y}) => {
  let row = null;
  switch (direction) {
    case 'up':
      row = level.rows[y-OFFSET];
      return row ? row.tiles[x] ? row.tiles[x] : null : null;
    case 'right':
      row = level.rows[y];
      return row ? row.tiles[x+OFFSET] ? row.tiles[x+OFFSET] : null : null;
    case 'down':
      row = level.rows[y+OFFSET];
      return row ? row.tiles[x] ? row.tiles[x] : null : null;
    case 'left':
      row = level.rows[y];
      return row ? row.tiles[x-OFFSET] ? row.tiles[x-OFFSET] : null : null;
    default:
      return null
  }
};

  const canMoveTo = (nextTile) => {
    console.log(nextTile);
    if(!nextTile) { return false }
    return nextTile ? nextTile.walkable : false;}

  const move = useCallback(async (direction) => {
    const activeCharacter = selectCharacter(active);
    const nextTile = getNextTile(direction,  activeCharacter.position);
    if(canMoveTo(nextTile)) {
      await dispatch({
        type: `MOVE_${direction.toUpperCase()}`,
        payload: { charId: active, offset: OFFSET }
      });
      setTimeout(() => {
        if(typeof afterMove === 'function') { afterMove(nextTile); }
      }, TIC_TIMEOUT)
    }
  }, [command]);

  const stop = () => dispatch({ type: 'STOP', payload: { charId: active } });


  useEffect(() => {
    switch(command.name) {
      case 'up':
      case 'right':
      case 'down':
      case 'left':
        move(command.name);
        break;
      case 'none':
        stop();
        break;
    }
  }, [command]);

  return (
    <div className="charLayer" style={style}>
      {state.map(char => (
        <Character
          active={active === char.id}
          key={char.name}
          name={char.name}
          position={char.position}
          size={config.tileWidth}
          animationDuration={300}
        />
      ))}
    </div>
  );
};

export default CharLayer;
