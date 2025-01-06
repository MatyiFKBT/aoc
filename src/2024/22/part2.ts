export default function solution({ lines }: Input) {
  const pruneMask = (1 << 24) - 1;

  function generateNext(num: number): number {
    num ^= (num << 6) & pruneMask;
    num ^= num >> 5;
    num ^= (num << 11) & pruneMask;
    return num;
  }

  const totalBananas: Map<string, number> = new Map();

  const numbers = lines.map((num) => parseInt(num, 10));

  for (let num of numbers) {
    const seen: Set<string> = new Set();
    const diffs: number[] = [];

    for (let i = 0; i < 2000; i++) {
      const nextNum = generateNext(num);
      diffs.push((nextNum % 10) - (num % 10));
      num = nextNum;

      if (i >= 3) {
        const sequence = JSON.stringify(diffs);
        // Convert the tuple (array) to a string representation
        if (!seen.has(sequence)) {
          const currentBananas = totalBananas.get(sequence) || 0;
          totalBananas.set(sequence, currentBananas + (num % 10));
          seen.add(sequence);
        }
        diffs.shift(); // Remove the oldest element
      }
    }
  }

  // Find the maximum value in the totalBananas map
  return Math.max(...Array.from(totalBananas.values()));
}

export const tests = [
  ["", 0],
];
