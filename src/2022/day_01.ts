export const part1 = (input: string) => {
  const blocks = input.trim().split("\n\n");
  let maxCalories = 0;
  const calories: number[] = [];
  blocks.forEach((block) => {
    let currCalorie = 0;
    block.split("\n").forEach((c) => {
      currCalorie += parseInt(c);
    });
    calories.push(currCalorie);
  });
  maxCalories = Math.max(...calories);
  return maxCalories;
};

export const part2 = (input: string) => {
  const blocks = input.split("\n\n");
  const calories: number[] = [];
  blocks.forEach((block) => {
    let currCalorie = 0;
    block.split("\n").forEach((c) => {
      currCalorie += parseInt(c);
    });
    calories.push(currCalorie);
  });

  console.log(
    calories.sort(function (a, b) {
      return b - a;
    }).slice(0, 3).reduce((partialSum, a) => partialSum + a, 0),
  );
};
