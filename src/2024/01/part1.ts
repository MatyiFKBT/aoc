export default function solution({ lines }: Input) {
  let result = 0;
  const list1: number[] = [];
  const list2: number[] = [];

  const rows = lines.map((w) => w.split(/\s+/));
  rows.forEach((row) => {
    list1.push(parseInt(row[0]));
    list2.push(parseInt(row[1]));
  });

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  list1.forEach((item, index) => {
    const diff = Math.abs(list2[index] - item);
    result += diff;
  });
  return result;
}

export const tests = [
  [
    `3   4
4   3
2   5
1   3
3   9
3   3`,
    11,
  ],
];
