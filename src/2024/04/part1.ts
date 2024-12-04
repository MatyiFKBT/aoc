export default function solution({ grid }: Input) {
  let result = 0;
  /**
   * need to check 8 ways from a given point:
   * - 4x diagonal
   * - 2x horizontal
   * - 2x vertical
   */
  const wordsFromXY = (x: number, y: number) => [
    // 2x horizontal
    grid[x]?.[y] + grid[x]?.[y + 1] + grid[x]?.[y + 2] + grid[x]?.[y + 3],
    grid[x]?.[y] + grid[x]?.[y - 1] + grid[x]?.[y - 2] + grid[x]?.[y - 3],
    // 2x vertical
    grid[x]?.[y] + grid[x + 1]?.[y] + grid[x + 2]?.[y] + grid[x + 3]?.[y],
    grid[x]?.[y] + grid[x - 1]?.[y] + grid[x - 2]?.[y] + grid[x - 3]?.[y],
    // 4x diagonal (x+y+, x+y-, x-y+, x-y-)
    grid[x]?.[y] + grid[x + 1]?.[y + 1] + grid[x + 2]?.[y + 2] +
    grid[x + 3]?.[y + 3],
    grid[x]?.[y] + grid[x + 1]?.[y - 1] + grid[x + 2]?.[y - 2] +
    grid[x + 3]?.[y - 3],
    grid[x]?.[y] + grid[x - 1]?.[y + 1] + grid[x - 2]?.[y + 2] +
    grid[x - 3]?.[y + 3],
    grid[x]?.[y] + grid[x - 1]?.[y - 1] + grid[x - 2]?.[y - 2] +
    grid[x - 3]?.[y - 3],
  ];

  // double for-loop, iterate through the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const letter = grid[j][i];
      if (letter === "X") {
        result += wordsFromXY(j, i).filter((word) => word === "XMAS").length;
      }
    }
  }
  return result;
}

export const tests = [
  [
    `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
    18,
  ],
];
