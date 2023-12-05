import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

const exampleInput = ``;

test("part1 - the example input", () => {
  expect(part1(exampleInput)).toBe(0);
});

test("part1 - the actual input", () => {
  expect(part1(input())).toBe(0);
});

test("part2 - the example input", () => {
  expect(part2(exampleInput)).toBe(0);
});

test("part2 - actual input", () => {
  expect(part2(input())).toBe(0);
});
