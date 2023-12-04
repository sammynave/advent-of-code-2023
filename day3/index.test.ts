import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

test("part1 - the example input", () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
  expect(part1(input)).toBe(4361);
});

test("part1 - the actual input", () => {
  expect(part1(input())).toBe(530495);
});

test("part2 - example input", () => {
  const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
  expect(part2(input)).toBe(467835);
});

test("part2 - actual input", () => {
  expect(part2(input())).toBe(80253814);
});
