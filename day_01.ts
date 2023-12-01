const parseDigits = (nums: number[] | []) => {
  if (nums.length === 0) return 0;
  return parseInt(`${nums[0]}${nums[nums.length - 1]}`);
};

export const part1 = (input: string) => {
  let sum = 0;
  input.split("\n").forEach((line) => {
    const chars = line.split("");
    const nums = chars.map((char) => parseInt(char)).filter(Boolean);
    sum += parseDigits(nums);
  });
  return sum;
};

export const part2 = (input: string) => {
  let sum = 0;

  input.split("\n").forEach((line) => {
    const digits = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ]
      .reduce(
        (prev, word, index) => prev.replaceAll(word, word + (index + 1) + word),
        // this is a bit hacky, but it works
        // turns "one" into "one1one"
        // and twone into "two2twone1one"
        // parsing this way returns both numbers
        line,
      )
      // same as part 1:
      .split("")
      .map(Number)
      .filter(Boolean);
    sum += parseDigits(digits);
  });
  return sum;
};
