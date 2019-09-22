import React from 'react';


const Tile = ({size}) => {

  const style = {
    backgroundColor: 'lightsalmon',
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
