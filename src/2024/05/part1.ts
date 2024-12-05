export default function solution({ input }: Input) {
  let result = 0;
  const parts = input.split("\n\n").map((w) => w.split("\n"));
  const rules = parts[0].map((row) => row.split("|"))
    .map((row) => row.map(Number));
  const updates = parts[1].map((row) => row.split(","))
    .map((row) => row.map(Number));

  updates.forEach((update) => {
    const isValid = rules.every((item) => {
      const [before, after] = item;
      const beforeIndex = update.indexOf(before);
      const afterIndex = update.indexOf(after);

      return beforeIndex < afterIndex || beforeIndex < 0 || afterIndex < 0;
    });
    if (isValid) {
      result += update[Math.floor(update.length / 2)];
    }
  });
  return result;
}

export const tests = [
  [
    `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
    143,
  ],
];
