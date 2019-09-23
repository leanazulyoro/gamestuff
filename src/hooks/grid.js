import { useCallback } from 'react';

const useGrid = (grid, tileWidth) => {
  const getTemplateRowsFromNum = useCallback((num) => {
    return `${tileWidth}px `.repeat(num);
  }, []);

  return {
    display: 'grid',
    gridTemplateRows: getTemplateRowsFromNum(grid.y),
    gridTemplateColumns: getTemplateRowsFromNum(grid.x),
  };

};

export default useGrid;
