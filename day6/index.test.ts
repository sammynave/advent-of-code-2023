import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

const exampleInput = `Time:      7  15   30
Distance:  9  40  200`;

test("part1 - the example input", () => {
  expect(part1(exampleInput)).toBe(288);
});

test("part1 - the actual input", () => {
  expect(part1(input())).toBe(3316275);
});

test("part2 - the example input", () => {
  expect(part2(exampleInput)).toBe(71503);
});

test("part2 - actual input", () => {
  expect(part2(input())).toBe(27102791);
});
