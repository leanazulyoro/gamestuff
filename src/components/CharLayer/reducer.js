import {useReducer} from 'react';

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

export function useMoveReducer() {
  return useReducer(reducer, initialState);
}
