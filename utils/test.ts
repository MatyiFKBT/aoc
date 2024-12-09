import { run } from "./run.ts";

export async function runTests(
  YEAR: string,
  DATE: string,
  PART: string | number,
) {
  console.clear();
  const formattedDate = `0${DATE}`.slice(-2);

  const { tests } = await import(
    `../src/${YEAR}/${formattedDate}/part${PART}.ts?t=${Date.now()}`
  );

  let shouldRunWithInput = true;
  if (tests) {
    for (const i of tests.keys()) {
      const [input, answer] = tests[i];

      const attempt = await run(YEAR, DATE, PART, input).catch((e) =>
        "Error: " + e
      );

      if (attempt == answer) {
        console.log(`%c(${i}) Passed`, "background-color: green");
      } else {
        console.log(`%c(${i}) Failed`, "background-color: red");
        console.log(` ╰  Expected: ${answer}`);
        console.log(` ╰  Received: ${attempt}`);
        shouldRunWithInput = false;
      }
    }
  } else console.log("No tests were specified");

  if (shouldRunWithInput) {
    console.time("running solution for puzzle input took");
    const attempt = await run(YEAR, DATE, PART).catch(() => "Error");
    console.log(`%cPuzzle input gives ${attempt}`, "background-color: orange");
    console.timeEnd("running solution for puzzle input took");
  }
}
