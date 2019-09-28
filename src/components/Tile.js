import React from 'react';

const tileColors = {
  regular: 'lightsalmon',
  wall: 'goldenrod',
};


const Tile = ({size, type}) => {

  const style = {
    backgroundColor: tileColors[type],
    width: `${size}px`,
    height: `${size}px`,
    border: '1px solid white',
    boxSizing: 'border-box',
  };


  return (
    <div className="tile" style={style}/>
  )
};


export default Tile;
