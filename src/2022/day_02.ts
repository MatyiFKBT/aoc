enum RPS {
  ROCK,
  PAPER,
  SCISSORS,
}

enum Outcome {
  WIN,
  LOSE,
  DRAW,
}

const getP = (char: string) => {
  if (char == "A" || char == "X") return RPS.ROCK;
  if (char == "B" || char == "Y") return RPS.PAPER;
  if (char == "C" || char == "Z") return RPS.SCISSORS;
};

const getP2 = (char: string) => {
  if (char == "A") return RPS.ROCK;
  if (char == "B") return RPS.PAPER;
  if (char == "C") return RPS.SCISSORS;
  if (char == "X") return Outcome.LOSE;
  if (char == "Y") return Outcome.DRAW;
  if (char == "Z") return Outcome.WIN;
};

const getWin = (arr: RPS[]) => {
  const [first, second] = arr;
  if (first == RPS.ROCK && second == RPS.PAPER) {
    return Outcome.WIN;
  }
  if (first == RPS.PAPER && second == RPS.SCISSORS) {
    return Outcome.WIN;
  }
  if (first == RPS.SCISSORS && second == RPS.ROCK) {
    return Outcome.WIN;
  }
  if (first == second) {
    return Outcome.DRAW;
  }
  return Outcome.LOSE;
};
const getLine = (line: string) => {
  const [x, y] = line.split(" ");
  return [getP(x), getP(y)];
};
const getLine2: [RPS, Outcome] | any = (line: string) => {
  const [x, y] = line.split(" ");
  return [getP2(x), getP2(y)];
};

const getMyPoints = (arr: RPS[]) => {
  let points = 0;
  const win = getWin(arr);
  if (win == Outcome.WIN) {
    points += 6;
  }
  if (win == Outcome.DRAW) {
    points += 3;
  }
  if (arr[1] == RPS.ROCK) {
    points += 1;
  }
  if (arr[1] == RPS.PAPER) {
    points += 2;
  }
  if (arr[1] == RPS.SCISSORS) {
    points += 3;
  }
  return points;
};

const getMyPoints2 = (i_played: RPS, outcome: Outcome) => {
  let points = 0;
  if (outcome == Outcome.WIN) {
    points += 6;
  }
  if (outcome == Outcome.DRAW) {
    points += 3;
  }
  if (i_played == RPS.ROCK) {
    points += 1;
  }
  if (i_played == RPS.PAPER) {
    points += 2;
  }
  if (i_played == RPS.SCISSORS) {
    points += 3;
  }
  return points;
};

export const part1 = (input: string) => {
  const games = input.trim().split("\n");
  let p = 0;
  games.forEach((game) => {
    const line = getLine(game);
    p += getMyPoints(line as RPS[]);
  });

  return p;
};

export const part2 = (input: string) => {
  const games = input.trim().split("\n");
  let p = 0;
  games.forEach((game) => {
    const line = getLine2(game);
    const [opp, exp_res] = line;
    let my_play: RPS = RPS.ROCK;
    if (exp_res == Outcome.DRAW) my_play = opp;
    if (opp == RPS.ROCK && exp_res == Outcome.LOSE) my_play = RPS.SCISSORS;
    if (opp == RPS.ROCK && exp_res == Outcome.WIN) my_play = RPS.PAPER;
    if (opp == RPS.PAPER && exp_res == Outcome.LOSE) my_play = RPS.ROCK;
    if (opp == RPS.PAPER && exp_res == Outcome.WIN) my_play = RPS.SCISSORS;
    if (opp == RPS.SCISSORS && exp_res == Outcome.LOSE) my_play = RPS.PAPER;
    if (opp == RPS.SCISSORS && exp_res == Outcome.WIN) my_play = RPS.ROCK;
    p += getMyPoints2(my_play, exp_res);
  });
  return p;
};
