import { leastCommonMultiple } from "../utils";

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

const calculateSteps = ({ nodes, startsWith, endsWith, instructions }) => {
	let steps = 0;
	let currentNode = nodes.find((n) => n[0].startsWith(startsWith));
	let currentDirection = 0;

	for (let i = 0; !currentNode[0].endsWith(endsWith); i++) {
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

export const part1 = (input) => {
	const [instructions, nodes] = parse(input);
	return calculateSteps({
		startsWith: "AAA",
		endsWith: "ZZZ",
		nodes,
		instructions,
	});
};

const startingNodes = (nodes) => nodes.filter((n) => n[0].endsWith("A"));

// I doubt this will ever finish with full input
export const part2Ineffecient = (input) => {
	const [instructions, nodes] = parse(input);
	let steps = 0;
	let currentNodes = startingNodes(nodes);
	const numOfNodes = currentNodes.length;
	let currentDirection = 0;
	// Instead of running until all three end in `Z`.
	// we could find the steps for each startingNode,
	// then find the least common multiple between them
	for (let i = 0; !currentNodes.every((n) => n[0].endsWith("Z")); i++) {
		const instruction = instructions[currentDirection];
		const nextNodes = [];
		for (let n = 0; nextNodes.length < numOfNodes; n++) {
			currentNodes.forEach((currentNode) => {
				if (nodes[n][0] === currentNode[1][RL[instruction]]) {
					nextNodes.push(nodes[n]);
				}
			});
		}

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

export const part2 = (input) => {
	const [instructions, nodes] = parse(input);
	return startingNodes(nodes)
		.map(([str]) => str)
		.map((startsWith) =>
			calculateSteps({ startsWith, endsWith: "Z", instructions, nodes })
		)
		.reduce(leastCommonMultiple);
};
