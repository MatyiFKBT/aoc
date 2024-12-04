export default function solution({ input }: Input) {
  let result = 0;
  const pattern = /mul\([\d]+,[\d]+\)/g;
  const found = input.match(pattern);
  found?.forEach((item) => {
    const numbers = item.match(/[\d]+/g)?.map(Number);
    const mult = [...numbers!].reduce((acc, cur) => acc * cur);
    result += mult;
  });
  return result;
}

export const tests = [
  [
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
    161,
  ],
];
