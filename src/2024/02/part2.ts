export default function solution({ lines }: Input) {
  const rows = lines.map((w) => w.split(" ").map(Number));
  const is_row_safe = (row: number[]) => {
    const diffs = row.map((item, index) => item - row[index - 1]);
    diffs.shift();
    const is_safe = diffs.every((diff) => diff >= -3 && diff < 0) ||
      diffs.every((diff) => diff > 0 && diff <= 3);
    if (is_safe) {
      return true;
    }
  };
  const safe_rows = rows.filter((row) => {
    if (is_row_safe(row)) {
      return true;
    }

    for (let index = 0; index < row.length; index++) {
      const new_row = [...row];
      new_row.splice(index, 1);
      if (is_row_safe(new_row)) {
        return true;
      }
    }
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
    4,
  ],
];
