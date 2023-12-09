import { bench } from "vitest";
import { input } from "./input.js";
import { part1 } from "./index.js";

bench("part1 - benchmark", () => {
  part1(input());
});
