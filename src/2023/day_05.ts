export const part1 = (input: string) => {
  const lines = input.split("\n");
  const seeds = lines[0].split(":")[1].split(" ").map(Number).filter(Boolean);
  const replaced = Array.from({ length: seeds.length }, () => false);
  console.log(seeds);
  lines.slice(1)
    .forEach((line) => {
      if (line && !line.includes("map:")) {
        const [next, curr, amount] = line.split(" ").map(Number);
        for (let i = 0; i < seeds.length; i++) {
          // console.log(`curr: ${curr}, amount: ${amount}`);
          if (
            !replaced[i] && curr <= seeds[i] && seeds[i] < curr + amount
          ) {
            seeds[i] = next + (seeds[i] - curr);
            replaced[i] = true;
          }
        }
      } else {
        replaced.map((_) => false);
      }
    });
  console.log(seeds);
  return Math.min(...seeds);
};
export const part2 = (input: string) => {
};

const input = Deno.readTextFileSync("input.txt");
console.log(part1(input));
