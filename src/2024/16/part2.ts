export default function solution({ grid }: Input) {
  let start = [-1, -1];
  let end = [-1, -1];
  const directions = [
    { dx: 1, dy: 0, name: "E" },
    { dx: 0, dy: 1, name: "S" },
    { dx: -1, dy: 0, name: "W" },
    { dx: 0, dy: -1, name: "N" },
  ] as const;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "S") start = [x, y];
      if (cell === "E") end = [x, y];
    });
  });

  const queue = [];
  const visited = new Set();
  let minCost = Infinity;

  queue.push({ cost: 0, x: start[0], y: start[1], dir: 0 });

  function getTurnCost(from: number, to: number) {
    const diff = Math.abs(from - to);
    const turns = Math.min(diff, 4 - diff);
    return turns * 1000;
  }

  while (queue.length > 0) {
    const { cost, x, y, dir } = queue.shift()!;
    const key = `${x},${y},${dir}`;

    if (x === end[0] && y === end[1]) {
      if (cost < minCost) {
        minCost = cost;
      }
    }

    if (visited.has(key)) continue;
    visited.add(key);
    directions.forEach((newDir, newDirIndex) => {
      const newX = x + newDir.dx;
      const newY = y + newDir.dy;

      if (
        newX < 0 || newY < 0 || newX >= grid[0].length || newY >= grid.length
      ) {
        return;
      }
      if (grid[newY][newX] === "#") return;

      const moveCost = 1;
      const turnCost = getTurnCost(dir, newDirIndex);
      const totalCost = cost + moveCost + turnCost;

      queue.push({ cost: totalCost, x: newX, y: newY, dir: newDirIndex });
      queue.sort((a, b) => a.cost - b.cost);
    });
  }

  const costs = new Map<string, number>();
  const optimalPaths = new Set();
  const paths = new Map<string, string[]>();

  const queue2: {
    cost: number;
    x: number;
    y: number;
    dir: number;
    path: string[];
  }[] = [];
  queue2.push({
    cost: 0,
    x: start[0],
    y: start[1],
    dir: 0,
    path: [`${start[0]},${start[1]}`],
  });
  while (queue2.length > 0) {
    const { cost, dir, path, x, y } = queue2.shift()!;
    const key = `${x},${y},${dir}`;

    if (cost > minCost) continue;
    if (costs.has(key) && costs.get(key)! < cost) continue;

    costs.set(key, cost);
    paths.set(key, path);

    if (x === end[0] && y === end[1]) {
      path.forEach((pos) => optimalPaths.add(pos));
    }
    directions.forEach((newDir, newDirIdx) => {
      const newX = x + newDir.dx;
      const newY = y + newDir.dy;

      if (
        newX < 0 || newY < 0 || newX >= grid[0].length || newY >= grid.length
      ) {
        return;
      }
      if (grid[newY][newX] === "#") return;
      const moveCost = 1;
      const turnCost = getTurnCost(dir, newDirIdx);
      const totalCost = cost + moveCost + turnCost;
      const newPos = `${newX},${newY}`;

      const newPath = [...path, newPos];
      const insertIndex = queue2.findIndex(({ cost }) => cost > totalCost);
      if (insertIndex === -1) {
        queue2.push({
          cost: totalCost,
          x: newX,
          y: newY,
          dir: newDirIdx,
          path: newPath,
        });
      } else {
        queue2.splice(insertIndex, 0, {
          cost: totalCost,
          x: newX,
          y: newY,
          dir: newDirIdx,
          path: newPath,
        });
      }
    });
  }
  return optimalPaths.size;
}

export const tests = [
  [
    `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
    45,
  ],
  [
    `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
    64,
  ],
];
