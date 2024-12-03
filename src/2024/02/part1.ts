export default function solution(input: string) {
  const rows = input.split("\n").filter((v) => v != "").map((w) =>
    w.split(" ").map((num) => parseInt(num))
  );
  const safe_rows = rows.filter((row) => {
    const diffs = row.map((item, index) => item - row[index - 1]);
    diffs.shift();
    const is_safe = diffs.every((diff) => diff >= -3 && diff < 0) ||
      diffs.every((diff) => diff > 0 && diff <= 3);
    return is_safe;
  });

  return safe_rows.length;
}

export const tests = [
  [
    `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
    2,
  ],
];
