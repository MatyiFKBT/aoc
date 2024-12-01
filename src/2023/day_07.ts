const LABELS = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const LABELS_PART2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const getType = (cards: string) => {
  const map = new Map<string, number>();
  const eachCard = cards.split("");
  const unique = new Set(eachCard);

  eachCard.forEach((char) => {
    map.set(char, (map.get(char) || 0) + 1);
  });

  const howMany: number[] = [...map.values()];

  if (unique.size === 1) return 0; // five of a kind
  if (unique.size === 2 && howMany.find((n) => n === 4)) return 1; // four of a kind
  if (unique.size === 2 && howMany.find((n) => n === 3)) return 2; // full house
  if (unique.size === 3 && howMany.find((n) => n === 3)) return 3; // three
  if (unique.size === 3 && howMany.find((n) => n === 2)) return 4; // two pairs
  if (unique.size === 4 && howMany.find((n) => n === 2)) return 5; // one pair
  return 6; // high card
};

const getBestType = (cards: string) => {
  let min = Infinity;
  let stack = [cards];
  let visited = new Set();
  while (stack.length > 0) {
    const curr = stack.pop();
    if (visited.has(curr)) continue;
    visited.add(curr);
    const type = getType(curr);
    if (min > type) {
      min = type;
    }
    if (curr?.indexOf("J") === -1 || type === 0) continue;
    const jPos = curr?.indexOf("J");
    let newCards = curr?.split("");
    for (let j = 0; j < LABELS_PART2.length; j++) {
      newCards[jPos] = LABELS_PART2[j];
      stack = [...stack, newCards?.join("")];
    }
  }
  return min;
};

const compareHands = (h1: string, h2: string, labels: string[]) => {
  const c1 = h1[0];
  const c2 = h2[0];
  for (let i = 0; i < c1.length; i++) {
    if (c1[i] !== c2[i]) {
      return labels.indexOf(c2[i]) - labels.indexOf(c1[i]);
    }
  }
  return 0;
};

export const part1 = (input: string) => {
  const values = Array(7).fill(0).map((_) => []) as number[][];
  input.split("\n").forEach((line) => {
    const hand = line.split(" ").map((part, indx) =>
      indx === 1 ? parseInt(part) : part
    );
    const i = getType(line.split(" ")[0]);
    values[i].push(hand);
  });
  for (let i = 0; i < 7; i++) {
    if (values[i].length !== 0) {
      values[i] = values[i].toSorted((a, b) => compareHands(a, b, LABELS));
    }
  }
  return values.reduce((acc, arr) => {
    return [...arr, ...acc];
  }, []).reduce((acc, hand, index) => {
    return acc + (hand[1] * (index + 1));
  }, 0);
};
export const part2 = (input: string) => {
  const values = Array(7).fill(0).map((_) => []) as number[][];
  input.split("\n").forEach((line) => {
    const hand = line.split(" ").map((part, indx) =>
      indx === 1 ? parseInt(part) : part
    );
    const best = getBestType(line.split(" ")[0]);
    values[best].push(hand);
  });
  for (let i = 0; i < 7; i++) {
    if (values[i].length !== 0) {
      values[i] = values[i].toSorted((a, b) =>
        compareHands(a, b, LABELS_PART2)
      );
    }
  }
  return values.reduce((acc, arr) => {
    return [...arr, ...acc];
  }, []).reduce((acc, hand, index) => {
    return acc + (hand[1] * (index + 1));
  }, 0);
};
