import { sum } from "../utils";

const findNextValue = (nums) => {
	let differences = nums;
	const steps = [differences[differences.length - 1]];
	while (!differences.every((x) => x === 0)) {
		differences = differences.reduce((seq, value, i, orig) => {
			if (typeof orig[i + 1] === "undefined") {
				return seq;
			}
			seq.push(orig[i + 1] - value);
			return seq;
		}, []);
		steps.push(differences[differences.length - 1]);
	}

	return sum(steps);
};

const findPreviousValue = (nums) => {
	let differences = nums;
	const steps = [differences[0]];
	while (!differences.every((x) => x === 0)) {
		differences = differences.reduce((seq, value, i, orig) => {
			if (typeof orig[i + 1] === "undefined") {
				return seq;
			}
			seq.push(value - orig[i + 1]);
			return seq;
		}, []);
		steps.push(differences[0]);
	}

	return sum(steps);
};

export const part1 = (input) => {
	const rows = input.split("\n").map((row) => row.split(" ").map(Number));
	const results = rows.map(findNextValue);

	return sum(results);
};

export const part2 = (input) => {
	const rows = input.split("\n").map((row) => row.split(" ").map(Number));
	const results = rows.map(findPreviousValue);

	return sum(results);
};
