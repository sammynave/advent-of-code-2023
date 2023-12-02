import { expect, test } from "vitest";
import { part1, part2, part2v2 } from "./index.js";
import { input } from "./input.js";

test("part1 - the example input", () => {
  const input = `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`;
  expect(part1(input)).toBe(142);
});

test("part1 - the actual answer", () => {
  const answer = 53080;
  expect(part1(input())).toBe(answer);
});

test("part2 - the example input", () => {
  const input = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`;

  expect(part2(input)).toBe(281);
});

test("part2v2 - the example input", () => {
  const input = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`;

  expect(part2v2(input)).toBe(281);
});

test("part2 - the actual answer", () => {
  expect(part2(input())).toBe(53268);
});

test("part2v2 - the actual answer", () => {
  expect(part2v2(input())).toBe(53268);
});
