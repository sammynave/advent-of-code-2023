export const sum = (numbers: number[]) =>
	numbers.reduce((sum, value) => sum + value, 0);

export const product = (numbers: number[]) =>
	numbers.reduce((product, value) => product * value, 1);

export const log = (arg: any) => {
	console.log(arg);
	return arg;
};

export const range = ({
	from,
	to,
	inclusive = true,
}: {
	from: number;
	to: number;
	inclusive?: boolean;
}) => {
	const length = inclusive ? to - from + 1 : to - from;
	return Array.from({ length }, () => from++);
};

export const partition = ({ array, partitionSize }) => {
	return array.reduce(
		(acc, val) => {
			const lastIndex = acc.length - 1;
			if (acc[lastIndex].length === partitionSize) {
				acc.push([val]);
			} else {
				acc[lastIndex].push(val);
			}
			return acc;
		},
		[[]]
	);
};

const greatestCommonDenominator = (a: number, b: number): number => {
	while (b !== 0) {
		let temp = b;
		b = a % b;
		a = temp;
	}
	return a;
};

export const leastCommonMultiple = (a: number, b: number): number => {
	return (a * b) / greatestCommonDenominator(a, b);
};
