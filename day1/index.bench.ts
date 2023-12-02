import { bench } from "vitest";
import { input } from "./input.js";
import { part2, part2v2 } from ".";

bench("part2 - benchmark", () => {
  part2(input());
});

bench("part2v2 - benchmark", () => {
  part2v2(input());
});
