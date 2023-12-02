import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";
import { product } from "../utils.js";

test("part1 - the example input", () => {
	const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
	expect(part1(input)).toBe(8);
});

test("part1 - the actual input", () => {
	expect(part1(input())).toBe(1853);
});

test("part2 - example input", () => {
	const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
	expect(part2(input)).toBe(2286);
});

test("part2 - actual input", () => {
	expect(part2(input())).toBe(72706);
});
