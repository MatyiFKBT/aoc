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
    const lastIndex = map.indexOf(".");
    if (lastIndex < i) {
      map[lastIndex] = map[i];
      map[i] = ".";
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
