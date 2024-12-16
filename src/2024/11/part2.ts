export default function solution({ input }: Input) {
  const initial = input.split(" ").map(Number);
  let stones: Record<number, number> = {};
  initial.forEach((stone) => {
    stones[stone] = (stones[stone] || 0) + 1;
  });

  const steps = 75;

  for (let index = 1; index <= steps; index++) {
    const nextStones: Record<number, number> = {};

    for (const [stoneStr, count] of Object.entries(stones)) {
      const stone = parseInt(stoneStr);

      if (stone === 0) {
        nextStones[1] = (nextStones[1] || 0) + count;
      } else if (stone.toString().length % 2 === 0) {
        const stoneAsString = stone.toString();
        const left = parseInt(
          stoneAsString.substring(0, stoneAsString.length / 2),
        );
        const right = parseInt(
          stoneAsString.substring(stoneAsString.length / 2),
        );
        nextStones[left] = (nextStones[left] || 0) + count;
        nextStones[right] = (nextStones[right] || 0) + count;
      } else {
        const multed = stone * 2024;
        nextStones[multed] = (nextStones[multed] || 0) + count;
      }
    }
    stones = nextStones;
  }

  // Calculate the total number of stones
  let totalStones = 0;
  for (const count of Object.values(stones)) {
    totalStones += count;
  }

  return totalStones;
}

export const tests = [
  ["125 17", 65601038650482],
];
