export default function solution({ grid }: Input) {
  let start = [0, 0];
  const OBSTACLE = "#";
  const obstacles = new Set();

  grid.forEach((row, x) => {
    row.forEach((slot, y) => {
      if (slot === OBSTACLE) {
        obstacles.add(x + "," + y);
      }
      if (slot === "^") start = [x, y];
    });
  });
  const dirs = {
    up: { move: [-1, 0], next: "right" },
    right: { move: [0, 1], next: "down" },
    down: { move: [1, 0], next: "left" },
    left: { move: [0, -1], next: "up" },
  };
  type Dir = keyof typeof dirs;

  const visited = new Set();
  let dir = "up" as Dir;
  let current = start;

  let outOfBounds = false;
  while (!outOfBounds) {
    visited.add(`${current[0]},${current[1]}`); // this ensures no duplicates, format: (x,y)
    const nextX = current[0] + dirs[dir].move[0];
    const nextY = current[1] + dirs[dir].move[1];
    if (
      nextX < 0 || nextX >= grid[0].length ||
      nextY < 0 || nextY >= grid.length
    ) outOfBounds = true; // out of bounds if any smaller than 0 or bigger than grid

    if (obstacles.has(nextX + "," + nextY)) {
      dir = dirs[dir].next as Dir;
    } else {
      current = [nextX, nextY];
    }
  }
  return visited.size;
}

export const tests = [
  [
    `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
    41,
  ],
];
