import { expect, test } from "vitest";
import { part1 } from "./index.js";
import { input } from "./input.js";

test("part1 - the example input", () => {
  const input = ``;
  expect(part1(input)).toBe(1);
});
test("part1 - the actual input", () => {
  expect(part1(input())).toBe(1);
});
