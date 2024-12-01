export const part1 = (input: string) => {
  const lines = input.split("\n").filter(Boolean);

  let sum = 0;
  let outString = "";
  lines.forEach((line, index) => {
    const numbers = [...line.matchAll(/\d+/g)];
    numbers.map((number) => {
      let startPosition = number.index;

      if (typeof startPosition === "undefined") {
        return;
      }
      let endPosition = startPosition +
        number.toString().length;
      const nextSymbol = line[endPosition] || "";
      const prevSymbol = line[startPosition - 1] || "";

      const aboveLine = lines[index - 1];
      const belowLine = lines[index + 1];

      // subtract 1 from the start position if the number is not the first
      // add 1 to the end position if the number is not the last
      startPosition > 0 && startPosition--;
      endPosition < line.length && endPosition++;
      const aboveChars = aboveLine &&
          aboveLine.slice(startPosition, endPosition) || [];
      const belowChars = belowLine &&
          belowLine.slice(startPosition, endPosition) || [];
      if (
        [...aboveChars, ...belowChars, ...nextSymbol, ...prevSymbol].some((
          char,
        ) => char !== "." && !parseInt(char))
      ) {
        const num = parseInt(number[0]);
        sum += num;
        outString += `${num}\t YES\n`;
      } else {
        const num = parseInt(number[0]);
        outString += `${num}\t NO\n`;
      }
    });
  });
  Deno.writeTextFileSync("day_03_output.txt", outString);
  return sum;
};
const specialCharacters = ["@", "#", "$", "%", "&", "*", "=", "+", "/", "-"];

const getSymbolCoords = (
  number: RegExpMatchArray,
  line: string,
  index: number,
  lines: string[],
) => {
  let startPosition = number.index;
  if (typeof startPosition === "undefined") {
    return;
  }
  const endPosition = startPosition + number.toString().length;
  const nextSymbol = line[endPosition] || "";
  const prevSymbol = line[startPosition - 1] || "";
  const aboveLine = lines[index - 1];
  const belowLine = lines[index + 1];

  startPosition > 0 && startPosition--;

  if (specialCharacters.includes(nextSymbol)) {
    return {
      x: index,
      y: endPosition,
      char: nextSymbol,
    };
  }
  if (specialCharacters.includes(prevSymbol)) {
    return {
      x: index,
      y: startPosition,
      char: prevSymbol,
    };
  }
  for (let i = startPosition; i <= endPosition; i++) {
    if (aboveLine && specialCharacters.includes(aboveLine.split("")[i])) {
      return {
        x: index - 1,
        y: i,
        char: aboveLine.split("")[i],
      };
    }
  }
  for (let i = startPosition; i <= endPosition; i++) {
    if (belowLine && specialCharacters.includes(belowLine.split("")[i])) {
      return {
        x: index + 1,
        y: i,
        char: belowLine.split("")[i],
      };
    }
  }
};

export const part2 = (input: string) => {
  const lines = input.split("\n").filter(Boolean);
  const matches = new Map<string, number[]>(); // store each symbol and its matches

  lines.forEach((line, index) => {
    const numbers = [...line.matchAll(/\d+/g)];
    numbers.map((number) => {
      const coords = getSymbolCoords(number, line, index, lines);
      if (coords) {
        const key = `${coords.x},${coords.y}`;
        if (matches.has(key)) {
          const newUniqueMatches = new Set<number>([
            ...matches.get(key)!,
            parseInt(number[0]),
          ]);
          matches.set(key, [...newUniqueMatches]);
        } else {
          matches.set(key, [parseInt(number[0])]);
        }
      }
    });
  });
  let outString = "";
  matches.forEach((value, key) => {
    if (value.length > 1) {
      outString += `${key}: ${value}\n`;
    }
  });
  Deno.writeTextFileSync("day_03_part2_output.txt", outString);
  const allMatches = [...matches.values()];
  const twoNearby = allMatches.filter((match) => match.length === 2);
  return twoNearby.reduce((acc, curr) => acc + curr[0] * curr[1], 0);
};
