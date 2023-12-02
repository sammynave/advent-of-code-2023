import { bench } from "vitest";
import { input } from "./1.test";
import { part2, part2v2 } from "./1";

bench("part2 - benchmark", () => {
  part2(input());
});

bench("part2v2 - benchmark", () => {
  part2v2(input());
});
