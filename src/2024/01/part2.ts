export default function solution(input: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  const rows = input.split("\n").filter((v) => v != "").map((w) =>
    w.split(/\s+/)
  );
  rows.forEach((row) => {
    list1.push(parseInt(row[0]));
    list2.push(parseInt(row[1]));
  });

  const amounts: { [key: number]: number } = {};

  list1.uniques().forEach((item) => {
    amounts[item] = list2.filter((_i) => _i == item).length;
  });
  let result = 0;
  list1.forEach((item) => {
    result += item * amounts[item];
  });
  return result;
}

export const tests = [
  [
    `
3   4
4   3
2   5
1   3
3   9
3   3`,
    31,
  ],
  [, 22014209],
];
