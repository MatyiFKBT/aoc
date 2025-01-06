export default function solution({ grid }: Input) {
  let start = [-1, -1];
  let end = [-1, -1];
  grid.forEach((r, y) => {
    r.forEach((c, x) => {
      if (c === "S") start = [x, y];
      if (c === "E") end = [x, y];
    });
  });

  const getDistances = (startPos: [number, number]) => {
    const distances = Array.from(
      { length: grid.length },
      () => Array(grid[0].length).fill(Infinity),
    );

    distances[startPos[1]][startPos[0]] = 0;
    const queue: [number, number][] = [[startPos[0], startPos[1]]];

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      const currentDist = distances[y][x];

      for (
        const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]
      ) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < grid[0].length &&
          newY >= 0 &&
          newY < grid.length &&
          grid[newY][newX] !== "#" &&
          distances[newY][newX] === Infinity
        ) {
          distances[newY][newX] = currentDist + 1;
          queue.push([newX, newY]);
        }
      }
    }

    return distances;
  };

  function findShortcuts(maxPortalDist: number) {
    const startDistances = getDistances(start);
    const endDistances = getDistances(end);
    const normalDist = startDistances[end[1]][end[0]];

    let shortcuts = 0;

    for (let y1 = 0; y1 < grid.length; y1++) {
      for (let x1 = 0; x1 < grid[0].length; x1++) {
        if (grid[y1][x1] === "#" || startDistances[y1][x1] === Infinity) {
          continue;
        }

        const minY = Math.max(0, y1 - maxPortalDist);
        const maxY = Math.min(grid.length - 1, y1 + maxPortalDist);

        for (let y2 = minY; y2 <= maxY; y2++) {
          const xRange = maxPortalDist - Math.abs(y2 - y1);
          if (xRange < 0) continue;

          const minX = Math.max(0, x1 - xRange);
          const maxX = Math.min(grid[0].length - 1, x1 + xRange);

          for (let x2 = minX; x2 <= maxX; x2++) {
            if (grid[y2][x2] === "#" || endDistances[y2][x2] === Infinity) {
              continue;
            }

            const portalSteps = Math.abs(x2 - x1) + Math.abs(y2 - y1);
            const totalDist = startDistances[y1][x1] + portalSteps +
              endDistances[y2][x2];

            if (normalDist - totalDist >= 100) {
              shortcuts++;
            }
          }
        }
      }
    }

    return shortcuts;
  }

  return findShortcuts(20);
}

export const tests = [
  [
    `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
    0,
  ],
];
