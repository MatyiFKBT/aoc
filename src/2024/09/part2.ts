export default function solution({ input }: Input) {
  const numbers = input.split("").map(Number);
  const map: (string | number)[] = [];
  for (let index = 0; index < numbers.length / 2; index++) {
    const size = numbers[index * 2];
    const space = numbers[index * 2 + 1];
    map.push(...Array.from({ length: size }).fill(index) as number[]);
    map.push(...Array.from({ length: space }).fill(".") as string[]);
  }

  for (let i = map.length - 1; i > 0; i--) {
    if (map[i] === ".") {
      continue;
    }
    const lengthOfFile = map.filter((value) => value === map[i]).length;
    const lengthDot = ".".repeat(lengthOfFile);
    const first = map.indexOf(map[i]);

    const lastIndex = map.map((x) => x === "." ? x : "x").join("").indexOf(
      lengthDot,
    );

    if (lastIndex < i && lastIndex != -1) {
      if (map[i] == ".") continue;

      map.splice(
        lastIndex,
        lengthOfFile,
        ...Array.from({ length: lengthOfFile }).fill(map[i]) as number[],
      );
      map.splice(
        first,
        lengthOfFile,
        ...Array.from({ length: lengthOfFile }).fill(".") as string[],
      );
    }
  }

  return map.reduce((total: number, value, index) => {
    if (value === ".") {
      return total;
    } // skip every "."

    const checksum = typeof value === "number" ? value * index : 0;
    return total + checksum;
  }, 0);
}

export const tests = [
  ["2333133121414131402", 1928],
];
