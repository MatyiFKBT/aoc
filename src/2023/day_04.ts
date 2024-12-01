export const part1 = (input: string) => {
  const lines = input.split("\n").filter(Boolean);
  let sum = 0;
  lines.forEach((line, index) => {
    const cardId = line.split(":")[0];
    const winningNumbers = line.split(":")[1].split("|")[0].split(" ").map(
      Number,
    ).filter(Boolean);
    const guesses = line.split(":")[1].split("|")[1].split(" ").map(Number)
      .filter(Boolean);

    const correctGuesses = guesses.filter((guess) =>
      winningNumbers.includes(guess)
    );
    const correctGuessesCount = correctGuesses.length;
    console.log(
      `Card ${cardId} has ${correctGuessesCount} correct guesses out of ${guesses.length}`,
    );
    let points = 0;
    correctGuesses.forEach((guess) => {
      if (points === 0) {
        points = 1;
      } else {
        points = points * 2;
      }
    });
    console.log(`Card ${cardId} has ${points} points`);
    sum += points;
  });
  return sum;
};

export const part2 = (input: string) => {
  const lines = input.split("\n").filter(Boolean);
  let sum = 0;
  const howMany: any = {};
  lines.forEach((line, index) => {
    const cardNr = index + 1;
    if (!howMany[cardNr]) {
      howMany[cardNr] = 1;
    }

    const winningNumbers = line.split(":")[1].split("|")[0].split(" ").map(
      Number,
    ).filter(Boolean);
    const guesses = line.split(":")[1].split("|")[1].split(" ").map(Number)
      .filter(Boolean);
    const correctGuessesCount = guesses.filter((guess) =>
      winningNumbers.includes(guess)
    ).length;

    console.log(`Card ${cardNr} has ${correctGuessesCount} correct guesses `);
    console.log(`You have ${howMany[cardNr]} cards`);
    console.log(
      `You're getting one copy of the next ${correctGuessesCount} cards`,
    );

    for (let i = cardNr + 1; i <= correctGuessesCount + 1; i++) {
      if (howMany[i]) {
        console.log(`You gained ${howMany[cardNr]} "${i}" cards`);
        howMany[i] = howMany[i] + (howMany[cardNr]);
      } else {
        howMany[i] = 1 + (howMany[cardNr] || 1);
      }
    }
  });
  console.log({ howMany });
};
