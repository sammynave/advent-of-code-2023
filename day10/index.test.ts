import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

const exampleInput = `.....
.S-7.
.|.|.
.L-J.
.....`;

const exampleInput2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

// S == 7
const exampleInput3 = `LJL-
F-SF
L-J-`;

test("part1 - the example input", () => {
  expect(part1(exampleInput)).toBe(4);
  expect(part1(exampleInput2)).toBe(8);
  expect(part1(exampleInput3)).toBe(3);
});

test("part1 - the actual input", () => {
  expect(part1(input())).toBe(6815);
  // NOT 6799
  // NOT 6806
});

// test("part2 - the example input", () => {
//   expect(part2(exampleInput)).toBe(0);
// });

// test("part2 - actual input", () => {
//   expect(part2(input())).toBe(0);
// });
