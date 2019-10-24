const level = {
  name: 'level 5',
  grid: {
    x: 8,
    y: 5
  },
  rows: [
    {
      tiles: [
        { key: 1, type: 'regular', walkable: true },
        { key: 2, type: 'regular', walkable: true },
        { key: 3, type: 'regular', walkable: true },
        { key: 4, type: 'regular', walkable: true },
        { key: 5, type: 'regular', walkable: true },
        { key: 6, type: 'regular', walkable: true },
        { key: 7, type: 'regular', walkable: true },
        { key: 8, type: 'regular', walkable: true },
      ],
    },
    {
      tiles: [
        { key: 9, type: 'regular', walkable: true },
        { key: 10, type: 'regular', walkable: true },
        { key: 11, type: 'regular', walkable: true },
        { key: 12, type: 'wall', walkable: false },
        { key: 13, type: 'regular', walkable: true },
        { key: 14, type: 'regular', walkable: true },
        { key: 15, type: 'regular', walkable: true },
        { key: 16, type: 'regular', walkable: true },
      ],
    },
    {
      tiles: [
        { key: 17, type: 'regular', walkable: true },
        { key: 18, type: 'regular', walkable: true },
        { key: 19, type: 'regular', walkable: true },
        { key: 20, type: 'regular', walkable: true },
        { key: 21, type: 'regular', walkable: true },
        { key: 22, type: 'portal', walkable: true, action: { type: 'teleport', to: 4}  },
        { key: 23, type: 'regular', walkable: true },
        { key: 24, type: 'regular', walkable: true },
      ],
    },
    {
      tiles: [
        { key: 25, type: 'regular', walkable: true },
        { key: 26, type: 'regular', walkable: true },
        { key: 27, type: 'regular', walkable: true },
        { key: 28, type: 'regular', walkable: true },
        { key: 29, type: 'regular', walkable: true },
        { key: 30, type: 'regular', walkable: true },
        { key: 31, type: 'regular', walkable: true },
        { key: 32, type: 'regular', walkable: true },
      ],
    },
  ],
};


export default level;
