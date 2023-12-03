/*
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

step 1. create data structures
given [
	`467..114..`,
	`...*......`
]
numberLocations = [
	{type: 'number', value: 467, y: 0, span: [0,1,2]},
	{type: 'number', value: 114, y: 0, span: [5,6,7]},
]
symbolLocations = [
	{type: 'symbol',  value: '*', y: 1 , span: [3]}
]
*/
type Datum = {
	type: "number" | "symbol" | null;
	value: number | string | null;
	y: number | null;
	span: number[] | null;
};

const nullDatum = () => ({ type: null, value: null, y: null, span: null });

const formatData = (input: string) => {
	const rows = input.split("\n");
	console.log({ rows });
	const numberLocations = [];
	const symbolLocations = [];

	let temp: Datum = nullDatum();
	rows.forEach((row, y) => {
		if (temp.type === "number") {
			numberLocations.push(temp);
		}
		temp = nullDatum();
		row.split("").forEach((char, x) => {
			if (char.match(/\d/)) {
				if (temp.type === "number") {
					temp.value = Number(`${temp.value}${char}`);
					temp.span = temp.span?.concat([x]) ?? [x];
				}

				if (temp.type === null) {
					temp.value = Number(char);
					temp.type = "number";
					temp.y = y;
					temp.span = [x];
				}
			} else if (char !== ".") {
				if (temp.type === "number") {
					numberLocations.push(temp);
				}
				temp = nullDatum();

				symbolLocations.push({
					type: "symbol",
					value: char,
					y,
					span: [x],
				});
			} else {
				if (temp.type === "number") {
					numberLocations.push(temp);
				}

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
partNumbers =  []
numberLocations.forEach((number) => {
	const possibleSymbols = symbolLocations.filter(({y}) => {
		return y === number.y || y === number.y - 1  || y === number.y + 1
	})
	possibleSymbols.forEach((symbol) => {
		if (isAdjacent(number, symbol)) {
			partNumbers.push(number)
		}
	})
})
*/

/*
step 3. sum part numbers
partNumbers.reduce((sum, {number}) => sum + number, 0)
*/
export const part1 = (input) => {
	const { numberLocations, symbolLocations } = formatData(input);
	console.log(numberLocations);
	console.log(symbolLocations);
};

export const part2 = (input) => {};
