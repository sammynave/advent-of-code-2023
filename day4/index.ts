import { range } from "../utils";

type WinningNumber = number;
type PickedNumber = number;
type Card = {
  id: number;
  winningNumbers: WinningNumber[];
  pickedNumbers: PickedNumber[];
  points: number;
  // count of numbers that match a WinningNumber
  matches: number;
  copies: number;
  cardIdsWon: Card["id"][];
};

const calculatePoints = (numbers, winningNumbers) => {
  let matches = 0;
  let points = 0;
  numbers.forEach((number) => {
    if (winningNumbers.includes(number)) {
      matches = matches + 1;
      points = points === 0 ? 1 : points * 2;
    }
  });
  return { matches, points };
};

const createCards = (input: string): Card[] => {
  const stringCards = input.split("\n");
  return stringCards.map((stringCard) => {
    const id = Number(stringCard.match(/\d+/));
    const [, stringLists] = stringCard.split(": ");
    const [winningNumbersStr, numbersStr] = stringLists.split(" | ");
    const winningNumbers = winningNumbersStr.match(/\d+/g)?.map(Number) ?? [];
    const pickedNumbers = numbersStr.match(/\d+/g)?.map(Number) ?? [];
    const { matches, points } = calculatePoints(pickedNumbers, winningNumbers);
    const nextId = id + 1;
    const finalId = id + matches;
    const cardIdsWon = range({ from: nextId, to: finalId });

    return {
      id,
      winningNumbers,
      pickedNumbers,
      matches,
      points,
      copies: 1,
      cardIdsWon,
    };
  });
};

export const part1 = (input) => {
  const cards = createCards(input);
  return cards.reduce((sum, { points }) => sum + points, 0);
};

export const part2 = (input) => {
  const cards = createCards(input);
  cards.forEach((card) => {
    card.cardIdsWon.forEach((cardId) => {
      const wonCard = cards.find((card) => card.id === cardId);
      if (wonCard) {
        // since we get another copy for every copy of the parent
        // add the parent copies here
        wonCard.copies += card.copies;
      }
    });
  });
  return Object.values(cards).reduce((sum, { copies }) => sum + copies, 0);
};
