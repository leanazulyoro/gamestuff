//import charImg from '../assets/character_layo.png';
import React from 'react';
import styles from './Character.module.css';


const Character = ({active, animationDuration, size, position: {x, y}}) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${size * x}px`,
    top: `${size * y}px`,
    transition: `all ${animationDuration}ms linear 0s`
  };
  return (
    <div className={`${styles.char} ${styles.layo} ${styles.idle}`} style={style} />
  )
};


export default Character;
