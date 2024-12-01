const charToNumber = (char: string) => {
  // if lower case, subtract 96 to get number
  if (char === char.toLowerCase()) {
    return char.charCodeAt(0) - 96;
  }
  // if upper case, subtract 38 to get number
  return char.charCodeAt(0) - 38;
};

export const part1 = (input: string) => {
  let value = 0;
  const lines = input.split("\n");
  lines.forEach((line: string) => {
    // split line into two parts at the half way point
    const firstHalf = line.slice(0, line.length / 2).split("");
    const secondHalf = line.slice(line.length / 2, line.length).split("");

    // find characters that are in both arrays
    const commonChars = new Set(
      firstHalf.filter((char) => secondHalf.includes(char)),
    );
    commonChars.forEach((char) => {
      // add the value of the character to the value
      value += charToNumber(char);
    });
  });
  return value;
};

export const part2 = (input: string) => {
  let value = 0;
  // create an array from the input split by each 3 lines
  const blocks = input.split("\n").reduce(
    (acc: string[][], line: string, index: number) => {
      if (index % 3 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(line);
      return acc;
    },
    [],
  );
  blocks.forEach((block: string[]) => {
    const commonChars = new Set(
      block[0].split("").filter((char) =>
        block[1].includes(char) && block[2].includes(char)
      ),
    );
    commonChars.forEach((char) => {
      value += charToNumber(char);
    });
  });
  return value;
};
