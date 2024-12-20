import "../src/utils/index.ts";

declare global {
  type Input = {
    input: string;
    lines: string[];
    grid: string[][];
  };
}

export async function run(
  currentYear: string,
  currentDate: string,
  part: string | number,
  input?: string,
) {
  const formattedDate = `0${currentDate}`.slice(-2);

  if (!input) {
    // return 0;
    input = await Deno.readFile(
      `./input/${currentYear}/${formattedDate}/input.txt`,
    )
      .then((c) => new TextDecoder("utf-8").decode(c));
  }
  const lines = input?.split("\n").filter((w) => w !== "");
  const grid = lines?.map((line) => line.split(""));
  const { default: solution } = await import(
    `../src/${currentYear}/${formattedDate}/part${part}.ts?t=${Date.now()}`
  );
  const attempt = solution({ input, grid, lines });

  return attempt;
}
