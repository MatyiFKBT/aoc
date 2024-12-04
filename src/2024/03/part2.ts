export default function solution({ input }: Input) {
  const pattern = /do\(\)|don\'t\(\)|mul\([\d]+,[\d]+\)/g;
  let result = 0;
  let do_mul = true;
  input.match(pattern)!.forEach((task) => {
    if (task == "do()") {
      do_mul = true;
    } else if (task == "don't()") {
      do_mul = false;
    } else {
      if (do_mul) {
        const numbers = task.match(/[\d+]+/g)?.map(Number)!;
        result += [...numbers].reduce((a, b) => a * b);
      }
    }
  });
  return result;
}

export const tests = [
  [
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    48,
  ],
];
