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

const parse = (input): [Instructions, NodeDirections[]] => {
	const [instructionsStr, nodeLeftRights]: [string, string] =
		input.split("\n\n");
	const instructions = instructionsStr.split("");
	const nodes: NodeDirections[] = nodeLeftRights
		.split("\n")
		.map((row): [Node, string] => row.split(" = ") as [Node, string])
		.map(formatNodeDirections);
	return [instructions, nodes];
};

export const part1 = (input) => {
	const [instructions, nodes] = parse(input);
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

const startingNodes = (nodes) => nodes.filter((n) => n[0].endsWith("A"));

export const part2 = (input) => {
	const [instructions, nodes] = parse(input);
	let steps = 0;
	let currentNodes = startingNodes(nodes);
	const numOfNodes = currentNodes.length;
	let currentDirection = 0;
	for (let i = 0; !currentNodes.every((n) => n[0].endsWith("Z")); i++) {
		const instruction = instructions[currentDirection];
		const nextNodes = [];
		nodes.forEach((n) => {
			if (numOfNodes === nextNodes.length) {
				return;
			}
			currentNodes.forEach((currentNode) => {
				if (n[0] === currentNode[1][RL[instruction]]) {
					nextNodes.push(n);
				}
			});
		});
		currentNodes = nextNodes;

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
