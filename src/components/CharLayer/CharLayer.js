import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import Character from '../Character';
import { GameContext } from '../Game';
import useGrid from '../../hooks/grid';
import { initialState, reducer } from './reducer';
import limiter from '../../helpers/limiter';

const OFFSET = 1;

const CharLayer = ({grid}) => {
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


  const canMoveTo = (direction, {x, y}) => {
    let nextTile = null;
    switch (direction) {
      case 'up':
        nextTile = level.rows[y-OFFSET] ? level.rows[y-OFFSET].tiles[x] : null;
        break;
      case 'right':
        nextTile = level.rows[y-OFFSET] ? level.rows[y].tiles[x+OFFSET] : null;
        break;
      case 'down':
        nextTile = level.rows[y-OFFSET] ? level.rows[y+OFFSET].tiles[x] : null;
        break;
      case 'left':
        nextTile = level.rows[y-OFFSET] ? level.rows[y].tiles[x-OFFSET] : null;
        break;
    }
    if(nextTile) {
      return nextTile.walkable
    }
    return false;
  };

  const move = useCallback((direction) => {
    const activeCharacter = selectCharacter(active);
    if(canMoveTo(direction, activeCharacter.position)) {
      dispatch({
        type: `MOVE_${direction.toUpperCase()}`,
        payload: { charId: active, offset: OFFSET }
      });
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
