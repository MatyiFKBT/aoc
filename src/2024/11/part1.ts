export default function solution({ input }: Input) {
  const initial = input.split(" ").map(Number);
  let stones = initial;
  const steps = 25;

  for (let index = 1; index <= steps; index++) {
    const nextStones: number[] = [];
    stones.forEach((stone) => {
      if (stone === 0) {
        nextStones.push(1);
      } else if (stone.toString().length % 2 === 0) {
        const stoneAsString = stone.toString();
        nextStones.push(
          parseInt(stoneAsString.substring(0, stoneAsString.length / 2)),
        );
        nextStones.push(
          parseInt(stoneAsString.substring(stoneAsString.length / 2)),
        );
      } else {
        nextStones.push(stone * 2024);
      }
    });
    stones = nextStones;
  }

  return stones.length;
}

export const tests = [
  ["125 17", 55312],
];
