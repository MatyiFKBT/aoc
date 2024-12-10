export default function solution({ lines }: Input) {
  let result = 0;
  const pairs = lines.map((line) => {
    const [target, nums] = line.split(": ");
    return {
      target: parseInt(target),
      numbers: nums.split(" ").map(Number),
    };
  });

  const validPairs = pairs.filter((pair) => {
    const numberOfOperations = pair.numbers.length - 1;
    const allowedOperators = ["+", "*", "||"];

    for (
      let index = 0;
      index < Math.pow(allowedOperators.length, numberOfOperations);
      index++
    ) {
      const operators = [];
      let n = index;
      for (let j = 0; j < numberOfOperations; j++) {
        operators.push(allowedOperators[n % allowedOperators.length]);
        n = Math.floor(n / allowedOperators.length);
      }

      let res = pair.numbers[0];
      for (let o = 0; o < operators.length; o++) {
        if (operators[o] === "+") {
          res += pair.numbers[o + 1];
        } else if (operators[o] === "*") {
          res *= pair.numbers[o + 1];
        } else if (operators[o] === "||") {
          res = parseInt(
            `${res}${pair.numbers[o + 1]}`,
          );
        }
      }
      if (res === pair.target) {
        return true;
      }
    }
    return false;
  });
  result = validPairs.reduce((acc, cur) => acc + cur.target, 0);
  return result;
}

export const tests = [
  [
    `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
    11387,
  ],
];
