import charImg from '../assets/character.png';
import React from 'react';


const Character = ({active, animationDuration, size, position: {x, y}}) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    boxSizing: 'border-box',
    position: 'absolute',
    left: `${size * x}px`,
    top: `${size * y}px`,
    transition: `all ${animationDuration}ms linear 0s`
  };
  return (
    <img style={style} src={charImg} />
  )
};


export default Character;
