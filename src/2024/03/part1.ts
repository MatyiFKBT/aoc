export default function solution(input: string) {
  const pattern = /mul\([0-9]+,[0-9]+\)/g;
  const found = input.match(pattern);
  let sum = 0;
  found?.forEach((item) => {
    const numbers = item.match(/[0-9]+/g)?.map((i) => parseInt(i));
    const mult = [...numbers!].reduce((acc, cur) => acc * cur);
    sum += mult;
  });
  return sum;
}

export const tests = [
  [
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
    161,
  ],
];
