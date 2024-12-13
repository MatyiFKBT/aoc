export default function solution({ grid }: Input) {
  let result = 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const trailheads: [number, number][] = [];
  grid.forEach((row, y) => {
    row.forEach((item, x) => {
      if (parseInt(item) === 0) trailheads.push([y, x]);
    });
  });

  trailheads.forEach(([x, y]) => {
    const visited = new Set<string>();
    const q = [[x, y]];
    visited.add(`${x},${y}`);
    const nines = new Set();

    while (q.length > 0) {
      const [x, y] = q.shift()!;
      const h = parseInt(grid[x][y]);
      if (h === 9) {
        nines.add(`${x},${y}`);
        continue;
      }
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
          continue;
        }
        if (parseInt(grid[nx][ny]) === h + 1 && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          q.push([nx, ny]);
        }
      }
    }
    result += nines.size;
  });
  return result;
}

export const tests = [
  [
    `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
    36,
  ],
];
