enum RL {
	"L" = 0,
	"R" = 1,
}

type Instructions = string[];
type Node = string;
type Directions = [Node, Node];
type NodeDirections = [Node, Directions];

const formatNodeDirections = ([node, directions]: [
	Node,
	string
]): NodeDirections => [
	node,
	directions.replace(/\(|\)/g, "").split(", ") as Directions,
];

export const part1 = (input) => {
	const [instructionsStr, nodeLeftRights]: [string, string] =
		input.split("\n\n");
	const instructions = instructionsStr.split("");
	const nodes: NodeDirections[] = nodeLeftRights
		.split("\n")
		.map((row): [Node, string] => row.split(" = ") as [Node, string])
		.map(formatNodeDirections);
	let steps = 0;
	let currentNode = nodes.find((n) => n[0] === "AAA");
	let currentDirection = 0;

	for (let i = 0; currentNode[0] !== "ZZZ"; i++) {
		const instruction = instructions[currentDirection];
		currentNode = nodes.find((n) => n[0] === currentNode[1][RL[instruction]]);

		steps++;

		// if we're at the last instruction, loop back to the beginning
		if (currentDirection === instructions.length - 1) {
			currentDirection = 0;
		} else {
			currentDirection++;
		}
	}

	return steps;
};

export const part2 = (input) => {};
