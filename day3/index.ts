type Number = {
  type: "number";
  value: number;
  y: number;
  span: number[];
};

type Symbol = {
  type: "symbol";
  value: string;
  y: number;
  span: number[];
  adjacentNumbers: Number[];
};

type Gear = {
  type: "gear";
  value: "*";
  y: number;
  span: number[];
  adjacentNumbers: Number[];
  gearRatio: number;
};

type NullDatum = {
  type: null;
  value: null;
  y: null;
  span: null;
};

type Datum = NullDatum | Number | Symbol;

const nullDatum = () => ({ type: null, value: null, y: null, span: null });

// this would be good to rewrite
const formatData = (input: string) => {
  const rows = input.split("\n");
  const numberLocations: Number[] = [];
  const symbolLocations: Symbol[] = [];
  let temp: Datum = nullDatum();
  rows.forEach((row, y) => {
    // Go through each char and build up a temp Datum
    row.split("").forEach((char, x) => {
      if (char.match(/\d/)) {
        if (temp.type === "number") {
          // extend number and span if we already have a `temp` of type `Number`
          temp.value = Number(`${temp.value}${char}`);
          temp.span = temp.span?.concat([x]) ?? [x];
        } else {
          // otherwise create a new `temp` of type `Number`
          temp = {
            value: Number(char),
            type: "number",
            y,
            span: [x],
          };
        }
      } else {
        // If temp is currently a `Number`, commit it
        if (temp.type === "number") {
          numberLocations.push(temp);
        }

        if (char !== ".") {
          // since symbols can't span multiple indicies, commit it immediately
          symbolLocations.push({
            type: "symbol",
            value: char,
            y,
            span: [x],
          });
        }

        // Reset temp
        temp = nullDatum();
      }
    });
  });

  return {
    numberLocations,
    symbolLocations,
  };
};

/*
step 2. iterate through numbers and look for adjacent symbol locations
*/
const isAdjacent = ({ number, symbol }) =>
  number.span.some(
    (x) =>
      (symbol.y === number.y && symbol.span[0] === x - 1) || // left
      (symbol.y === number.y - 1 && symbol.span[0] === x - 1) || //top-left
      (symbol.y === number.y - 1 && symbol.span[0] === x) || //top
      (symbol.y === number.y - 1 && symbol.span[0] === x + 1) || //top-right
      (symbol.y === number.y && symbol.span[0] === x + 1) || //right
      (symbol.y === number.y + 1 && symbol.span[0] === x + 1) || //bottom-right
      (symbol.y === number.y + 1 && symbol.span[0] === x) || //bottom
      (symbol.y === number.y + 1 && symbol.span[0] === x - 1) //bottom-left
  );

const getPartNumbers = ({ numberLocations, symbolLocations }) =>
  numberLocations.flatMap((number) =>
    symbolLocations.map((symbol) =>
      isAdjacent({ number, symbol }) ? number.value : 0
    )
  );

/*
step 3. sum part numbers
*/
const sum = (partNumbers) => partNumbers.reduce((sum, value) => sum + value, 0);

export const part1 = (input) => sum(getPartNumbers(formatData(input)));

const findGearsF = (numberLocations) => (gear) => {
  // could cut out as soon as adjacentNumbers === 2
  numberLocations.forEach((number) => {
    if (isAdjacent({ number, symbol: gear })) {
      gear.adjacentNumbers = Array.isArray(gear.adjacentNumbers)
        ? gear.adjacentNumbers.concat([number])
        : [number];
    }
  });

  if (gear.adjacentNumbers.length === 2) {
    gear.type = "gear";
    gear.gearRatio = gear.adjacentNumbers.reduce(
      (product, number) => product * number.value,
      1
    );
  }

  return gear;
};

const findGears = ({ numberLocations, symbolLocations }): Gear[] => {
  const potentialGears = symbolLocations.filter(({ value }) => value === "*");
  const findGears = findGearsF(numberLocations);
  return potentialGears.map(findGears).filter((pGear) => pGear.type === "gear");
};

export const part2 = (input) => {
  return findGears(formatData(input)).reduce(
    (sum, { gearRatio }) => sum + gearRatio,
    0
  );
};
