export default function solution(input: string) {
  const pattern = /do\(\)|don\'t\(\)|mul\([0-9]+,[0-9]+\)/g;
  let sum = 0;
  let do_mul = true;
  input.match(pattern)!.forEach((task) => {
    if (task == "do()") {
      do_mul = true;
    } else if (task == "don't()") {
      do_mul = false;
    } else {
      if (do_mul) {
        const numbers = task.match(/[0-9]+/g)?.map(Number)!;
        sum += [...numbers].reduce((a, b) => a * b);
      }
    }
  });
  return sum;
}

export const tests = [
  [
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    48,
  ],
];
