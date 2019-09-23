import charImg from '../assets/character.png';
import React from 'react';


const Character = ({size}) => {

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    boxSizing: 'border-box',
    position: 'absolute',
  };
  return (
    <img style={style} src={charImg} />
  )
};


export default Character;
