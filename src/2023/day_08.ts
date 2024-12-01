const input = Deno.readTextFileSync("input.txt");

const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const lcmm = (nums: number[]): number => {
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    res = lcm(res, nums[i]);
  }
  return res;
};

const mapping = new Map<string, string[]>();
const lines = input.split("\n") as string[];

let instructions: string;
lines.forEach((line, idx) => {
  if (idx === 0) {
    instructions = line;
  } else if (idx > 1) {
    const { from, left, right } = line.match(
      /(?<from>\w{3}) = \((?<left>\w{3}), (?<right>\w{3})\)/,
    )!
      .groups as any;
    mapping.set(from, [left, right]);
  }
});

const findNext = (curr: string, currNr: number) => {
  return mapping.get(
    curr,
  )![instructions[currNr % instructions.length] === "L" ? 0 : 1];
};
export const part1 = (input: string) => {
  let begin = "AAA";
  const target = "ZZZ";

  let count = 0;

  while (begin !== target) {
    begin = findNext(begin, count);
    count++;
  }
  return count;
};
export const part2 = (input: string) => {
  let begins = [...mapping.keys()].filter((key) => key.endsWith("A"));
  let periods = begins.map((_) => 0);
  let c = 0;
  while (!periods.every((n) => n !== 0)) {
    begins = begins.map((b) => findNext(b, c));
    begins.forEach((b, idx) => {
      if (b.endsWith("Z") && periods[idx] === 0) {
        periods[idx] = c;
      }
    });
    c++;
  }
  periods = periods.map((p) => p + 1);
  return lcmm(periods);
};

console.log("Part 1", part1(input));
console.log("Part 2", part2(input));
