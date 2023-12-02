import { sum } from "../utils";

const numerals = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];
const digits = /\d/g;

const firstAndLast = (array: number[]): number =>
	Number(`${array[0]}${array[array.length - 1]}`);

const extractNumbers = (input) =>
	input.split("\n").map((line) => firstAndLast(line.match(digits)));

export function part1(input) {
	return sum(extractNumbers(input));
}

/*
  steps
  1. input `two1nine
  eightwo`
  2. split on "\n" into Array<string> and trim
  3. for each line, push [index, digit] into array Array<[Index, Digit]>
    3a. get first digit and index
    3a. get first last digit and index
    3b. get first numeral and starting index
      3bi. convert to digit
    3c. get last numeral and starting index
      3ci. convert to digit
  4. sort Array<[Index, Digit]> by Index
  5. take first and last from sorted array
  6. concatenate the last member in each pair and push into array
  5. sum array [29, 82]
*/
type Index = number;
type Digit = number;

const getFirstDigitIndexTuple = (str: string): [Index, Digit] => {
	const regexpResult = str.match(/\d/);
	return typeof regexpResult?.index === "number"
		? [regexpResult.index, Number(regexpResult[0])]
		: [Infinity, Infinity];
};

const getLastDigitIndexTuple = (str: string): [Index, Digit] => {
	const lastDigit = /(\d)(?!.*\d)/;
	const regexpResult = str.match(lastDigit);
	return typeof regexpResult?.index === "number"
		? [regexpResult.index, Number(regexpResult[0])]
		: [Infinity, Infinity];
};

const getFirstLastNumeralTuple = (str: string): Array<[Index, Digit]> => {
	const toSort: Array<[Index, Digit]> = [];
	numerals.forEach((numeral, digit) => {
		// Handle the numeral appearing more than once in the string
		const matcheIndexes = [...str.matchAll(new RegExp(numeral, "gi"))].map(
			(match) => match.index
		);

		matcheIndexes.forEach((idx) => {
			if (typeof idx === "number") {
				toSort.push([idx, digit]);
			}
		});
	});

	const sorted = toSort.sort(([aIndex], [bIndex]) => aIndex - bIndex);
	const first = sorted[0];
	const last = sorted[sorted.length - 1];
	return [first, last];
};

const extractValues = (rows: Array<string>): Array<number> => {
	return rows.map((row) => {
		const toSort: Array<[number, number]> = [];

		const firstDigitTuple = getFirstDigitIndexTuple(row);
		if (firstDigitTuple.every(isFinite)) {
			toSort.push(firstDigitTuple);
		}

		const lastDigitTuple = getLastDigitIndexTuple(row);
		if (lastDigitTuple.every(isFinite)) {
			toSort.push(lastDigitTuple);
		}

		const firstLastNumeralTuples = getFirstLastNumeralTuple(row);
		firstLastNumeralTuples.forEach((tuple) => {
			if (tuple?.every(isFinite)) {
				toSort.push(tuple);
			}
		});

		const sorted = toSort
			.sort(([aIndex], [bIndex]) => aIndex - bIndex)
			.map(([, digit]) => digit);
		const first = sorted[0];
		const last = sorted[sorted.length - 1];

		return Number(`${first}${last}`);
	});
};

export function part2(input) {
	return sum(extractValues(input.split("\n").map((row) => row.trim())));
}

export function part2v2(input) {
	// new strategy: swap out numerals for shorthand with embedded digit.
	// this way we don't have to care about finding numerals and converting them.
	// just replace everything and grab the first and last digits.
	const numeralsSymbols = {
		one: "o1e",
		two: "t2o",
		three: "t3e",
		four: "f4",
		five: "f5e",
		six: "s6x",
		seven: "s7n",
		eight: "e8t",
		nine: "n9e",
	};

	Object.entries(numeralsSymbols).forEach(
		([key, value]) => (input = input.replaceAll(key, value))
	);
	const firstDigit = /\d/;
	const lastDigit = /(\d)(?!.*\d)/;
	const numbers = input
		.split("\n")
		// using `lastDigit` regex is ~2x faster than line.split('').reverse().join('').match(firstDigit)
		.map((line) =>
			Number(
				`${Number(line.match(firstDigit))}${Number(
					line.match(lastDigit)?.[0] ?? 0
				)}`
			)
		);

	return sum(numbers);
}
