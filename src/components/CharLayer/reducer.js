
export const initialState = [
  {
    id: 1,
    name: 'Bruce',
    moving: false,
    position: {
      x: 2,
      y: 2
    }
  },
];

export const reducer = (state, action) => {
  Object.freeze(state);
  const targetChar = state.find(char => char.id === action.payload.charId);
  switch(action.type){
    case 'MOVE_UP':
      return [
        ...state.filter(char => char.id !== action.payload.charId),
        {
          ...targetChar,
          moving: true,
          position: {
            ...targetChar.position,
            y: targetChar.position.y - action.payload.offset,
          }
        }
      ];
    case 'MOVE_DOWN':
      return [
        ...state.filter(char => char.id !== action.payload.charId),
        {
          ...targetChar,
          moving: true,
          position: {
            ...targetChar.position,
            y: targetChar.position.y + action.payload.offset,
          }
        }
      ];
    case 'MOVE_LEFT':
      return [
        ...state.filter(char => char.id !== action.payload.charId),
        {
          ...targetChar,
          moving: true,
          position: {
            ...targetChar.position,
            x: targetChar.position.x - action.payload.offset,
          }
        }
      ];
    case 'MOVE_RIGHT':
      return [
        ...state.filter(char => char.id !== action.payload.charId),
        {
          ...targetChar,
          moving: true,
          position: {
            ...targetChar.position,
            x: targetChar.position.x + action.payload.offset,
          }
        }
      ];
    case 'STOP':
      return [
        ...state.filter(char => char.id !== action.payload.charId),
        {
          ...targetChar,
          moving: false,
        }
      ];
    case 'MOVE':
      return [
        ...state.filter(char => char.id !== action.payload.charId),
        {
          ...targetChar,
          moving: true,
        }
      ];
    default:
      return state;
  }
};
