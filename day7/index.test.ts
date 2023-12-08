import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

const exampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const y = `TT3T9 509
J79A7 865`;

test("part1 - the example input", () => {
	expect(part1(exampleInput)).toBe(6440);
});

test("part1 - the actual input", () => {
	expect(part1(input())).toBe(251121738);
});

test("part2 - the example input", () => {
	expect(part2(exampleInput)).toBe(5905);
});

test("part2 - actual input", () => {
	expect(part2(input())).toBe(251421071);
});
