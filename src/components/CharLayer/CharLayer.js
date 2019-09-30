import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import Character from '../Character';
import { GameContext } from '../Game';
import useGrid from '../../hooks/grid';
import { useQueue, useQueueWithDelay } from '../../hooks/queue';

const OFFSET = 1;


const initialState = {
  id: 1,
  name: 'Bruce',
  moving: false,
  position: {
    x: 2,
    y: 2
  }
};

function reducer(state, action) {

  Object.freeze(state);
  console.log("prevState: ", state);
  console.log("action: ", action);
  switch(action.type){
    case 'MOVE_UP':
      return {
        ...state,
        position: {
          ...state.position,
          y: state.position.y - action.payload.offset,
        }
      };
    case 'MOVE_DOWN':
      console.log('_');
      return {
        ...state,
        position: {
          ...state.position,
          y: state.position.y + action.payload.offset,
        }
      };
    case 'MOVE_LEFT':
      return {
        ...state,
        position: {
          ...state.position,
          x: state.position.x - action.payload.offset,
        }
      };
    case 'MOVE_RIGHT':
      console.log('!');
      return {
        ...state,
        position: {
          ...state.position,
          x: state.position.x + action.payload.offset,
        }
      };
    case 'STOP':
      return {
        ...state,
        moving: false,
      };
    case 'MOVE':
      return {
        ...state,
        moving: true,
      };
    default:
      return state;
  }
};

const CharLayer = ({grid}) => {
  const {tic, config, command } = useContext(GameContext);
  const gridStyles = useGrid(grid, config.tileWidth);
  const [active, setActive] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [intervals, setIntervals] = useState([]);
  const addToQueue = useQueueWithDelay({delay: 300, limit: 100});


  const style = {
    ...gridStyles,
    position: 'absolute',
    top: '-10px',
    left: 0,
  };

  const selectCharacter = (id) => {
    return state.find(char => char.id === id);
  };


  const move = useCallback((direction) => {
    console.log('moving...');
    addToQueue(() => {
      dispatch({
        type: `MOVE_${direction.toUpperCase()}`,
        payload: { charId: active, offset: OFFSET }
      });
    });
  }, [addToQueue]);

  const stop = useCallback(() => {
    addToQueue(() => {
      dispatch({
        type: 'STOP',
        payload: { charId: active }
      });
    });
  }, [addToQueue]);


  useEffect(() => {
    switch(command) {
      case 'up':
      case 'right':
      case 'down':
      case 'left':
        //console.log('command -> ', command);
        move(command);
        break;
      case 'none':
        //stop();
        break;
    }

  }, [command]);

  return (
    <div className="charLayer" style={style}>
      <Character
        active={active === state.id}
        key={state.name}
        name={state.name}
        position={state.position}
        size={config.tileWidth}
        animationDuration={300}
      />
    </div>
  );
};

export default CharLayer;
