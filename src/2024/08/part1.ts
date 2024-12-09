export default function solution({ grid }: Input) {
  const abc = "abcdefghijklmnopqrstuvwxyz";
  const antis: { x: number; y: number }[] = [];

  const symbols = [
    abc.split(""),
    abc.toUpperCase().split(""),
    "0123456789".split(""),
  ].flat();

  symbols.forEach((symbol) => {
    const positions: { x: number; y: number }[] = [];
    grid.forEach((row, y) => {
      row.forEach((char, x) => {
        if (char == symbol) {
          positions.push({ x, y });
        }
      });
    });

    positions.forEach((pos1) => {
      positions.forEach((pos2) => {
        if (pos1.x === pos2.x && pos1.y === pos2.y) {
          return;
        }
        const xdiff = pos1.x - pos2.x;
        const ydiff = pos1.y - pos2.y;

        if (pos1.x + xdiff !== pos2.x && pos1.y + ydiff !== pos2.y) {
          antis.push({ x: pos1.x + xdiff, y: pos1.y + ydiff });
        } else {
          antis.push({ x: pos1.x - xdiff, y: pos1.y - ydiff });
        }
        if (pos2.x + xdiff !== pos1.x && pos2.y + ydiff !== pos1.y) {
          antis.push({ x: pos2.x + xdiff, y: pos2.y + ydiff });
        } else {
          antis.push({ x: pos2.x - xdiff, y: pos2.y - ydiff });
        }
      });
    });
  });

  return antis.filter((pos) =>
    pos.x >= 0 && pos.y >= 0 && pos.x < grid[0].length && pos.y < grid.length
  ).filter((pos, index, arr) => {
    return arr.findIndex((p) => p.x === pos.x && p.y === pos.y) === index;
  }).length;
}

export const tests = [
  [
    `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
    14,
  ],
];
