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
  const memo = new Map<string, number>();

  const ways = (x: number, y: number): number => {
    if (memo.has(`${x},${y}`)) {
      return memo.get(`${x},${y}`)!;
    }
    const h = parseInt(grid[x][y]);
    if (h === 9) {
      memo.set(`${x},${y}`, 1);
      return 1;
    }
    let total = 0;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
        continue;
      }
      if (parseInt(grid[nx][ny]) === h + 1) {
        total += ways(nx, ny);
      }
    }
    memo.set(`${x},${y}`, total);
    return total;
  };
  trailheads.forEach(([x, y]) => {
    result += ways(x, y);
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
    81,
  ],
];
