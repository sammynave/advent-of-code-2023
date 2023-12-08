import { expect, test } from "vitest";
import { part1, part2 } from "./index.js";
import { input } from "./input.js";

const exampleInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const exampleInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

test("part1 - the example input", () => {
	expect(part1(exampleInput1)).toBe(2);
	expect(part1(exampleInput2)).toBe(6);
});

test("part1 - the actual input", () => {
	expect(part1(input())).toBe(15989);
});

// test("part2 - the example input", () => {
//   expect(part2(exampleInput)).toBe(0);
// });

// test("part2 - actual input", () => {
//   expect(part2(input())).toBe(0);
// });
