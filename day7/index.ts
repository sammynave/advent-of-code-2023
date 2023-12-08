const cardValues = {
	A: 14,
	K: 13,
	Q: 12,
	J: 11,
	T: 10,
	9: 9,
	8: 8,
	7: 7,
	6: 6,
	5: 5,
	4: 4,
	3: 3,
	2: 2,
};

const handCounts = () => {
	return {
		A: 0,
		K: 0,
		Q: 0,
		J: 0,
		T: 0,
		9: 0,
		8: 0,
		7: 0,
		6: 0,
		5: 0,
		4: 0,
		3: 0,
		2: 0,
	};
};

const getValue = (card: keyof typeof cardValues, joker: boolean = false) => {
	if (joker) {
		return card === "J" ? 0 : cardValues[card];
	} else {
		return cardValues[card];
	}
};

const scoreHand = (hand) => {
	return hand.reduce((counts, card) => {
		counts[card]++;
		return counts;
	}, handCounts());
};

const isFiveOfAKind = (scoredHand) =>
	Object.values(scoredHand).some((n) => n === 5);
const isFourOfAKind = (scoredHand) =>
	Object.values(scoredHand).some((n) => n === 4);
const containsJoker = (scoredHand) =>
	Object.entries(scoredHand).some(([card, value]) => card === "J" && value > 0);
const isFullHouse = (scoredHand) =>
	Object.values(scoredHand).some((n) => n === 3) &&
	Object.values(scoredHand).some((n) => n === 2);
const isThreeOfAKind = (scoredHand) =>
	Object.values(scoredHand).some((n) => n === 3);
const isTwoPair = (scoredHand) =>
	Object.values(scoredHand).filter((n) => n === 2).length === 2;
const isOnePair = (scoredHand) =>
	Object.values(scoredHand).filter((n) => n === 2).length === 1;

const handTypes = {
	"five-of-a-kind": (scoredHand, joker: boolean = false) => {
		return joker
			? isFiveOfAKind(scoredHand) ||
					(containsJoker(scoredHand) &&
						(isFourOfAKind(scoredHand) || isFullHouse(scoredHand)))
			: isFiveOfAKind(scoredHand);
	},
	"four-of-a-kind": (scoredHand, joker: boolean = false) => {
		const jokers = joker ? scoredHand["J"] : 0;
		if (joker) {
			return (
				isFourOfAKind(scoredHand) ||
				(containsJoker(scoredHand) && isTwoPair(scoredHand) && jokers === 2) ||
				(containsJoker(scoredHand) && isThreeOfAKind(scoredHand))
			);
		} else {
			return isFourOfAKind(scoredHand);
		}
	},
	"full-house": (scoredHand, joker: boolean = false) => {
		const jokers = joker ? scoredHand["J"] : 0;
		if (joker) {
			return isFullHouse(scoredHand) || (jokers === 1 && isTwoPair(scoredHand));
		} else {
			return isFullHouse(scoredHand);
		}
	},
	"three-of-a-kind": (scoredHand, joker: boolean = false) => {
		const jokers = joker ? scoredHand["J"] : 0;
		if (joker) {
			// maybe need to check if the pair is NOT JJ
			return (
				isThreeOfAKind(scoredHand) ||
				(containsJoker(scoredHand) && isOnePair(scoredHand) && jokers === 1) ||
				(containsJoker(scoredHand) && isOnePair(scoredHand) && jokers === 2)
			);
		} else {
			return isThreeOfAKind(scoredHand);
		}
	},
	"two-pair": (scoredHand, joker: boolean = false) => {
		return isTwoPair(scoredHand);
	},
	"one-pair": (scoredHand, joker: boolean = false) => {
		const jokers = joker ? scoredHand["J"] : 0;
		if (joker) {
			return (isOnePair(scoredHand) && jokers === 0) || jokers === 1;
		} else {
			return isOnePair(scoredHand);
		}
	},
	"high-card": () => true,
};
const positions = [
	"five-of-a-kind",
	"four-of-a-kind",
	"full-house",
	"three-of-a-kind",
	"two-pair",
	"one-pair",
	"high-card",
];

const parseInput = (str: string) => {
	return str.split("\n").reduce((handBids, row) => {
		const [hand, bid] = row.split(" ");
		return handBids.concat([{ hand, bid: Number(bid) }]);
	}, []);
};

const addScore = (handBid) => {
	handBid.scoredHand = scoreHand(handBid.hand.split(""));
	return handBid;
};

const addType =
	(joker: boolean = false) =>
	(handBid) => {
		const [type] = Object.entries(handTypes).find(([type, fn]) => {
			return fn(handBid.scoredHand, joker);
		});
		handBid.type = type;
		return handBid;
	};

const addPosition = (handBid) => {
	handBid.position = positions.indexOf(handBid.type);
	return handBid;
};

const sortHands =
	(joker: boolean = false) =>
	(a, b) => {
		if (a.position !== b.position) {
			return b.position - a.position;
		} else if (a.hand[0] !== b.hand[0]) {
			// who has higher first card
			return getValue(a.hand[0], joker) - getValue(b.hand[0], joker);
		} else if (a.hand[1] !== b.hand[1]) {
			// then second
			return getValue(a.hand[1], joker) - getValue(b.hand[1], joker);
		} else if (a.hand[2] !== b.hand[2]) {
			// then third
			return getValue(a.hand[2], joker) - getValue(b.hand[2], joker);
		} else if (a.hand[3] !== b.hand[3]) {
			// then fourth
			return getValue(a.hand[3], joker) - getValue(b.hand[3], joker);
		} else {
			// then fifth
			return getValue(a.hand[4], joker) - getValue(b.hand[4], joker);
		}
	};

const addRank = (hand, i) => {
	hand.rank = i + 1;
	return hand;
};

const addWinnings = (hand) => {
	hand.winnings = hand.rank * hand.bid;
	return hand;
};

export const part1 = (input) => {
	const parsed = parseInput(input);
	const handBids = parsed.map(addScore).map(addType()).map(addPosition);
	const scoredHands = handBids.sort(sortHands()).map(addRank).map(addWinnings);
	return scoredHands.reduce((total, hand) => total + hand.winnings, 0);
};

export const part2 = (input) => {
	const parsed = parseInput(input);
	const handBids = parsed.map(addScore).map(addType(true)).map(addPosition);
	const scoredHands = handBids
		.sort(sortHands(true))
		.map(addRank)
		.map(addWinnings);
	return scoredHands.reduce((total, hand) => total + hand.winnings, 0);
};
