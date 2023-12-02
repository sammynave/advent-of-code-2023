export const sum = (numbers: number[]) =>
	numbers.reduce((sum, value) => sum + value, 0);

export const log = (arg: any) => {
	console.log(arg);
	return arg;
};
