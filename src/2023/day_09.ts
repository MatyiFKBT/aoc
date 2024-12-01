const buildTree = (input: number[]): number[][] => {
  let curr = input;
  const tree = [input] as number[][];
  let next = [] as number[];

  while (!curr.every((num) => num === 0)) {
    for (let i = 0; i < curr.length - 1; i++) {
      next.push(curr[i + 1] - curr[i]);
    }
    tree.push(next);
    curr = next;
    next = [];
  }

  return tree;
};

export const part1 = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(" ").map(Number));
  const tree = lines.map(buildTree);

  const next = tree.map((t) => {
    return t.reduceRight((acc, curr) => {
      return acc + curr[curr.length - 1];
    }, 0);
  });

  return next.reduce((acc, curr) => acc + curr, 0);
};

export const part2 = (input: string) => {
  const lines = input.split("\n").map((line) => line.split(" ").map(Number));
  const tree = lines.map(buildTree);

  const prev = tree.map((t) => {
    return t.reduceRight((acc, curr) => {
      return curr[0] - acc;
    }, 0);
  });

  return prev.reduce((acc, curr) => acc + curr, 0);
};
