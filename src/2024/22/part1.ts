export default function solution({ lines }: Input) {
  let result = 0;
  const pruneMask = (1 << 24) - 1;

  function generateNext(num: number): number {
    num ^= (num << 6) & pruneMask;
    num ^= num >> 5;
    num ^= (num << 11) & pruneMask;
    return num;
  }
  const numbers = lines.map((num) => parseInt(num, 10));
  for (let num of numbers) {
    for (let i = 0; i < 2000; i++) {
      num = generateNext(num);
    }
    result += num;
  }
  return result;
}

export const tests = [
  [
    `1
10
100
2024`,
    37327623,
  ],
];
