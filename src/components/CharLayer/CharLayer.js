import React, { useContext, useEffect, useReducer, useState } from 'react';
import Character from '../Character';
import { GameContext } from '../Game';
import useGrid from '../../hooks/grid';
import { initialState, reducer } from './reducer';

const OFFSET = 1;

const CharLayer = ({grid}) => {
  const {config, command } = useContext(GameContext);
  const gridStyles = useGrid(grid, config.tileWidth);
  const [active, setActive] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [intervals, setIntervals] = useState([]);
  const style = {
    ...gridStyles,
    position: 'absolute',
    top: '-10px',
    left: 0,
  };

  const selectCharacter = (id) => {
    return state.find(char => char.id === id);
  };


  const move = async (direction) => {
    const activeCharacter = selectCharacter(active);
    if(activeCharacter.moving) { return }
    await dispatch({
      type: 'MOVE',
      payload: { charId: active }
    });
    await dispatch({
      type: `MOVE_${direction.toUpperCase()}`,
      payload: { charId: active, offset: OFFSET }
    });
    setIntervals([...intervals, setInterval(async () => {
      await dispatch({
        type: `MOVE_${direction.toUpperCase()}`,
        payload: { charId: active, offset: OFFSET }
      });
    }, 300)]);
  };

  const stop = () => {
    const activeCharacter = selectCharacter(active);
    if(!activeCharacter.moving) { return }
    intervals.map(i => clearInterval(i));
    dispatch({
      type: 'STOP',
      payload: { charId: active }
    });
  };

  useEffect(() => {

    switch(command) {
      case 'up':
      case 'right':
      case 'down':
      case 'left':
        move(command);
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
