export default function solutionPart2({ input }: { input: string }): number {
  const [towels_, designs_] = input.split("\n\n");
  const towels = new Set(towels_.split(", ").map((towel) => towel.trim()));
  const designs = designs_.split("\n").map((design) => design.trim());

  // Cache object to memoize results
  const cache: Record<string, number> = {};

  function countWays(design: string): number {
    if (design === "") return 1; // Base case: if the design is empty, one valid way

    if (design in cache) return cache[design]; // Return cached result if exists

    let combinations = 0;

    for (const towel of towels) {
      if (design.startsWith(towel)) {
        combinations += countWays(design.slice(towel.length));
      }
    }

    cache[design] = combinations; // Memoize result
    return combinations;
  }

  // Sum up all combinations for all designs
  return designs.reduce((total, design) => total + countWays(design), 0) - 1;
}

export const tests = [
  [
    `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
    16,
  ],
];
