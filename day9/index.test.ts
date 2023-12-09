import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

const exampleInputA = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test("part1 - the example input", () => {
	expect(part1(exampleInputA)).toBe(114);
});

test("part1 - the actual input", () => {
	expect(part1(input())).toBe(1974232246);
});

// test("part2 - the example input", () => {
//   expect(part2(exampleInput)).toBe(0);
// });

// test("part2 - actual input", () => {
//   expect(part2(input())).toBe(0);
// });
