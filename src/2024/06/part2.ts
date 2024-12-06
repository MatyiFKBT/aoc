export default function solution({ grid }: Input) {
  let result = 0;
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

  function gridHasLoop(extraPoint: [number, number]): boolean {
    const turnPoints = new Set<string>();
    const extraPointKey = `${extraPoint[0]},${extraPoint[1]}`;

    if (obstacles.has(extraPointKey)) {
      return false;
    }

    let current = start;
    let dir: Dir = "up";

    while (true) {
      const nextX = current[0] + dirs[dir].move[0];
      const nextY = current[1] + dirs[dir].move[1];
      const nextPoint = `${nextX},${nextY}`;

      // Check if next position is in bounds
      const inBounds = nextX >= 0 &&
        nextX < grid.length &&
        nextY >= 0 &&
        nextY < grid[0].length;

      if (!inBounds) return false;

      // Check if next position is an obstacle or extra point
      if (obstacles.has(nextPoint) || nextPoint === extraPointKey) {
        dir = dirs[dir].next as Dir;
        continue;
      }

      // Move to the next point
      current = [nextX, nextY];

      // Track turning points
      const turnKey = `${current[0]},${current[1]},${dir}`;
      if (turnPoints.has(turnKey)) {
        return true;
      }
      turnPoints.add(turnKey);
    }
  }
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (gridHasLoop([x, y])) {
        result++;
      }
    }
  }
  return result;
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
    6,
  ],
];
