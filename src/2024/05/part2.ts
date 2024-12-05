export default function solution({ input }: Input) {
  let result = 0;
  const parts = input.split("\n\n").map((w) => w.split("\n"));
  const rules = parts[0].map((row) => row.split("|"))
    .map((row) => row.map(Number));
  const updates = parts[1].map((row) => row.split(","))
    .map((row) => row.map(Number));

  const invalidUpdates = updates.filter((update) => {
    const isInvalid = rules.some((item) => {
      const [before, after] = item;
      const beforeIndex = update.indexOf(before);
      const afterIndex = update.indexOf(after);

      return !(beforeIndex < afterIndex || beforeIndex < 0 || afterIndex < 0);
    });
    return isInvalid;
  });

  const reordered = invalidUpdates.map((update) => {
    const beforeX: Record<number, Set<number>> = {};
    update.forEach((number) => {
      beforeX[number] = new Set();
    });
    rules.forEach(([before, after]) => {
      if (update.includes(before) && update.includes(after)) {
        beforeX[after].add(before);
      }
    });
    const fixed = [];
    const missing = new Set(update);

    while (missing.size > 0) {
      const available = [...missing].filter((number) =>
        [...beforeX[number]].every((before) => !missing.has(before))
      );
      if (available.length === 0) {
        const next = [...missing][0];
        fixed.push(next);
        missing.delete(next);
      } else {
        fixed.push(available[0]);
        missing.delete(available[0]);
      }
    }
    return fixed;
  });

  reordered.forEach((update) => {
    result += update[Math.floor(update.length / 2)];
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
    123,
  ],
];
