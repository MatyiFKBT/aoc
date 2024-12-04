export default function solution({ grid }: Input) {
  let result = 0;
  const checkA = (x: number, y: number) => [
    // only need to check 2, result could be MAS or SAM
    grid[x - 1]?.[y - 1] + grid[x]?.[y] + grid[x + 1]?.[y + 1],
    grid[x - 1]?.[y + 1] + grid[x]?.[y] + grid[x + 1]?.[y - 1],
  ];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const letter = grid[j]?.[i];
      if (letter === "A") {
        if (checkA(j, i).every((w) => w === "MAS" || w === "SAM")) {
          result += 1;
        }
      }
    }
  }
  return result;
}

export const tests = [
  [
    `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
    9,
  ],
];
