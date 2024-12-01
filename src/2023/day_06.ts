export const part1 = (input: string) => {
  const times = input[0].split(":")[1].split(" ").map(Number).filter(Boolean);
  const dists = input[1].split(":")[1].split(" ").map(Number).filter(Boolean);
  const canWins: number[] = [];
  for (let i = 0; i < times.length; i++) {
    let canWin = 0;
    for (let j = 1; j < Array.from({ length: times[i] }).length; j++) {
      const myDist = (times[i] - j) * j;
      if (myDist > dists[i]) {
        canWin++;
      }
    }
    canWins.push(canWin);
  }
  return canWins.reduce((a, b) => a * b, 1);
};

export const part2 = (input: string) => {
  const time = parseInt(input[0].split(":")[1].split(" ").join(""));
  const dist = parseInt(input[1].split(":")[1].split(" ").join(""));
  const sqrt = Math.sqrt(time ** 2 - 4 * dist);
  return Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
};
