import { log } from "console";
import { sum } from "../utils";

/*
  Part 1
*/
type Pull = {
	red?: number;
	green?: number;
	blue?: number;
};

type Game = { id: number; pulls: Pull[] };

const diceCollection = {
	red: 12,
	green: 13,
	blue: 14,
};

const lineToPulls = (line: string): Pull[] =>
	line
		.split(":")[1]
		.split(";")
		.map((pull) => pull.split(","))
		.map((pairs) => pairs.map((pair) => pair.match(/(\d+)|([a-zA-Z]+)/g) ?? []))
		.map((pairs) =>
			Object.fromEntries(pairs.map(([value, key]) => [key, Number(value)]))
		);

const inputToGames = (input: string) => {
	return input
		.split("\n")
		.map(lineToPulls)
		.map((pulls, idx) => ({ id: idx + 1, pulls }));
};
const isPossible = (game: Game): boolean => {
	return game.pulls.every(
		({ green = 0, blue = 0, red = 0 }) =>
			green <= diceCollection.green &&
			blue <= diceCollection.blue &&
			red <= diceCollection.red
	);
};

export function part1(input: string) {
	const games = inputToGames(input);
	const possibleGameIds = games
		.filter((game) => isPossible(game))
		.map(({ id }) => id);
	return sum(possibleGameIds);
}

/*
  Part 2
*/

export function part2(input: string) {}
