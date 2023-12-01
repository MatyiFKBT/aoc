const isFullOverlap = (pair1: number[], pair2: number[]): boolean => {
  const [start1, end1] = pair1;
  const [start2, end2] = pair2;
  return start1 <= start2 && end1 >= end2 || start2 <= start1 && end2 >= end1;
};

const isAnyOverlap = (pair1: number[], pair2: number[]): boolean => {
  const [start1, end1] = pair1;
  const [start2, end2] = pair2;
  // parse the pairs into arrays
  const pair1Array = Array.from(
    { length: end1 - start1 + 1 },
    (_, i) => i + start1,
  );
  const pair2Array = Array.from(
    { length: end2 - start2 + 1 },
    (_, i) => i + start2,
  );
  // check if any of the numbers in pair1Array are in pair2Array
  return pair1Array.some((num) => pair2Array.includes(num));
};

export const part1 = (input: string) => {
  let result = 0;

  const lines = input.trim().split("\n");
  const elfPairs: number[][][] = lines.map((line) => {
    const [elf1, elf2] = line.split(",").map((exp: string) => {
      const [start, end] = exp.split("-").map((num) => parseInt(num, 10));
      return [start, end];
    });
    return [elf1, elf2];
  });

  // find the elf pairs that overlap
  elfPairs.forEach((elfPair: number[][]) => {
    const [elf1, elf2] = elfPair;
    const overlap = isFullOverlap(elf1, elf2);
    if (overlap) {
      result += 1;
    }
  });

  return result;
};

export const part2 = (input: string) => {
  let result = 0;

  const lines = input.trim().split("\n");
  const elfPairs: number[][][] = lines.map((line) => {
    const [elf1, elf2] = line.split(",").map((exp: string) => {
      const [start, end] = exp.split("-").map((num) => parseInt(num, 10));
      return [start, end];
    });
    return [elf1, elf2];
  });

  // find the elf pairs that overlap
  elfPairs.forEach((elfPair: number[][]) => {
    const [elf1, elf2] = elfPair;
    const overlap = isAnyOverlap(elf1, elf2);
    if (overlap) {
      result += 1;
    }
  });

  return result;
};
