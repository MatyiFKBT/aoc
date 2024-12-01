const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseLine = (line: string): { id: number; reveals: string[] } => {
  const id = parseInt(line.split(": ")[0].replace("Game ", ""));
  const reveals = line.split(": ")[1].split(";");
  return { id, reveals };
};

export const part1 = (input: string) => {
  let sum = 0;

  input.split("\n").forEach((line) => {
    if (line === "") return;
    const { id, reveals } = parseLine(line);
    let possible = true;
    reveals.forEach((items) => {
      const item = items.split(",");
      item.forEach((i) => {
        i = i.trim();
        const amount = parseInt(i.split(" ")[0]);
        const color = i.split(" ")[1] as keyof typeof bag;

        if (bag[color] < amount) {
          possible = false;
        }
      });
    });

    if (possible) {
      sum += id;
    }
  });

  return sum;
};

export const part2 = (input: string) => {
  let sum = 0;

  input.split("\n").forEach((line) => {
    if (line === "") return;
    const min = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const { reveals } = parseLine(line);

    reveals.forEach((items) => {
      const item = items.split(",");
      item.forEach((i) => {
        i = i.trim();
        const amount = parseInt(i.split(" ")[0]);
        const color = i.split(" ")[1] as keyof typeof bag;

        if (amount > min[color]) {
          min[color] = amount;
        }
      });
    });

    sum += min.red * min.green * min.blue;
  });
  return sum;
};
