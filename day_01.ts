const parseDigits = (nums: number[] | []) => {
  if (nums.length === 0) return 0;
  return parseInt(`${nums[0]}${nums[nums.length - 1]}`);
};

export const part1 = (input: string) => {
  let sum = 0;
  input.split("\n").forEach((line) => {
    const chars = line.split("");
    const nums = chars.map((char) => parseInt(char)).filter((num) =>
      !isNaN(num)
    );
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
        (acc, word, index) => acc.replaceAll(word, word + (index + 1) + word),
        line,
      )
      .split("")
      .map(Number)
      .filter(Boolean);
    sum += parseDigits(digits);
  });
  return sum;
};
