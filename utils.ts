export const sum = (numbers: number[]) =>
	numbers.reduce((sum, value) => sum + value, 0);
export const product = (numbers: number[]) =>
	numbers.reduce((product, value) => product * value, 1);
export const log = (arg: any) => {
	console.log(arg);
	return arg;
};
