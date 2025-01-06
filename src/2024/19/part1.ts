export default function solution({ input }: Input) {
  let [towels_, designs_] = input.split("\n\n");
  const towels = towels_.split(", ").map((t) => t.trim());
  const designs = designs_.split("\n").map((s) => s.trim());
  console.log(towels.length, designs.length);
  function arrange(i: number, design: string): boolean {
    if (i === design.length) {
      return true;
    }

    for (const towel of towels) {
      if (
        i + towel.length <= design.length &&
        design.substring(i, i + towel.length) === towel
      ) {
        if (arrange(i + towel.length, design)) {
          return true;
        }
      }
    }

    return false;
  }
  const result = designs.filter((design) => arrange(0, design));
  return result.length - 1;
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
    6,
  ],
];
