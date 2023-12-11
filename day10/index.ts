import { C } from "vitest/dist/reporters-5f784f42";

type Y = -1 | 0 | 1;
type X = -1 | 0 | 1;

const south: Coordinate = [1, 0];
const west: Coordinate = [0, -1];
const north: Coordinate = [-1, 0];
const east: Coordinate = [0, 1];

type Ground = ".";
type Pipe = "|" | "-" | "L" | "J" | "F" | "7";
type Coordinate = [Y, X];
type StartingMatrix = Array<Array<Ground | Pipe | "S">>;
type Matrix = Array<Array<Ground | Pipe>>;

const makeMatrix = (input: string): Matrix =>
  input.split("\n").map((row) => row.split("")) as Matrix;

const findS = (matrix: StartingMatrix): Coordinate => {
  let s: Coordinate | null = null;

  outer: for (let [y, row] of matrix.entries()) {
    for (let [x, col] of row.entries()) {
      if (col === "S") {
        s = [y as Y, x as X];
        break outer;
      }
    }
  }

  return s as Coordinate;
};

const MAP = {
  F: {
    adjacent1: ([y, x]): Coordinate => [y + east[0], x + east[1]],
    adjacent2: ([y, x]): Coordinate => [y + south[0], x + south[1]],
  },
  "|": {
    adjacent1: ([y, x]): Coordinate => [y + north[0], x + north[1]],
    adjacent2: ([y, x]): Coordinate => [y + south[0], x + south[1]],
  },
  "-": {
    adjacent1: ([y, x]): Coordinate => [y + east[0], x + east[1]],
    adjacent2: ([y, x]): Coordinate => [y + west[0], x + west[1]],
  },
  L: {
    adjacent1: ([y, x]): Coordinate => [y + north[0], x + north[1]],
    adjacent2: ([y, x]): Coordinate => [y + east[0], x + east[1]],
  },
  J: {
    adjacent1: ([y, x]): Coordinate => [y + north[0], x + north[1]],
    adjacent2: ([y, x]): Coordinate => [y + west[0], x + west[1]],
  },
  "7": {
    adjacent1: ([y, x]): Coordinate => [y + south[0], x + south[1]],
    adjacent2: ([y, x]): Coordinate => [y + west[0], x + west[1]],
  },
};

const TYPES: Pipe[] = ["|", "-", "L", "J", "F", "7"];

const getType = ([y, x], matrix) => matrix[y][x];

const findLoop = (s: Coordinate, type: Pipe, matrix: Matrix) => {
  const lastPipe = MAP[type].adjacent2(s);
  let previousPipe = s;
  let currentPipe = MAP[type].adjacent1(s);
  let loopCoordinates: Coordinate[] = [currentPipe];
  let i = 0;
  while (currentPipe.toString() !== lastPipe.toString()) {
    const currentPipeType = getType(currentPipe, matrix);

    // If current pipe isn't a pipe, this isn't the loop
    if (currentPipeType === "." || typeof currentPipeType === "undefined") {
      loopCoordinates = [];
      break;
    }

    const a1 = MAP[currentPipeType]?.adjacent1(currentPipe);
    const a2 = MAP[currentPipeType]?.adjacent2(currentPipe);

    // If next or previous pipes aren't in the matrix, this isn't the loop
    if (typeof a1 === "undefined" || typeof a2 === "undefined") {
      loopCoordinates = [];
      break;
    }

    // Out of bounds
    if (
      a1[0] < 0 ||
      a1[0] > matrix.length - 1 ||
      a1[1] < 0 ||
      a1[1] > matrix[0].length - 1
    ) {
      loopCoordinates = [];
      break;
    }

    // Out of bounds
    if (
      a2[0] < 0 ||
      a2[0] > matrix.length - 1 ||
      a2[1] < 0 ||
      a2[1] > matrix[0].length - 1
    ) {
      loopCoordinates = [];
      break;
    }

    const a1Type = s.toString() === a1.toString() ? type : getType(a1, matrix);

    if (!TYPES.includes(a1Type)) {
      console.log(`i: ${i} a1 is of type ${getType(a1, matrix)}`);
      loopCoordinates = [];
      break;
    }

    const a2Type = s.toString() === a2.toString() ? type : getType(a2, matrix);

    if (!TYPES.includes(a2Type)) {
      console.log(`: ${i} a2 is of type ${getType(a2, matrix)}`);
      loopCoordinates = [];
      break;
    }

    if (a1.toString() === previousPipe.toString()) {
      previousPipe = currentPipe;
      currentPipe = a2;
    } else if (a2.toString() === previousPipe.toString()) {
      previousPipe = currentPipe;
      currentPipe = a1;
    } else {
      // pipes don't line up
      loopCoordinates = [];
      break;
    }
    loopCoordinates.push(currentPipe);
    i++;
  }

  return loopCoordinates;
};

const getLoop = (s: Coordinate, matrix: Matrix) => {
  let loop: Coordinate[] = [];

  for (let i = 0; i < TYPES.length; i++) {
    const maybeLoop = findLoop(s, TYPES[i], matrix);
    if (maybeLoop.length) {
      loop = maybeLoop;
      break;
    }
  }

  return loop;
};

const visualize = (s, input, loop, furthestStep) => {
  const prettyInput = input
    .replaceAll("|", "│")
    .replaceAll("-", "─")
    .replaceAll("L", "└")
    .replaceAll("J", "┘")
    .replaceAll("7", "┐")
    .replaceAll("F", "┌")
    .replaceAll("S", "*");

  const stringCoords = [s.toString(), ...loop.map((x) => x.toString())];
  const visual = prettyInput
    .split("\n")
    .map((row, y) =>
      row
        .split("")
        .map((char, x) => {
          return stringCoords.includes([y, x].toString())
            ? stringCoords[furthestStep] === [y, x].toString()
              ? "@"
              : char
            : "·";
        })
        .join("")
    )
    .join("\n");

  console.log(`* = Starting point\n@ = Half-way point`);
  console.log(visual);
};

export const part1 = (input) => {
  const matrix: Matrix = makeMatrix(input);
  const s = findS(matrix);
  const loop = getLoop(s, matrix);
  const furthestStep = Math.ceil(loop.length / 2);
  visualize(s, input, loop, furthestStep);

  return furthestStep;
};

export const part2 = (input) => {};
