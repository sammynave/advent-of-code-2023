import { range } from "../utils";

const getRangeFromTime = (totalDuration) => {
  return range({ from: 0, to: totalDuration }).map((d) => {
    const remaining = totalDuration - d;
    return d * remaining;
  });
};

export const part1 = (input) => {
  const [timeStr, distanceStr] = input.split("\n");
  const ms = timeStr.match(/\d+/g).map(Number);
  const mm = distanceStr.match(/\d+/g).map(Number);

  const possibleMs = mm.map((record, i) => {
    const raceDuration = ms[i];
    return getRangeFromTime(raceDuration).reduce<number[]>(
      (timesThatBeatRecord, distance, time) => {
        if (distance > record) {
          timesThatBeatRecord.push(time);
        }
        return timesThatBeatRecord;
      },
      []
    );
  });
  return possibleMs.reduce((product, { length: waysToWin }) => {
    return product * waysToWin;
  }, 1);
};

export const part2 = (input) => {
  const [timeStr, distanceStr] = input.split("\n");
  const raceDuration = Number(
    timeStr.match(/\d+/g).reduce((acc, time) => `${acc}${time}`, "")
  );

  const record = Number(
    distanceStr.match(/\d+/g).reduce((acc, time) => `${acc}${time}`, "")
  );

  const possibleMs = getRangeFromTime(raceDuration).reduce<number[]>(
    (timesThatBeatRecord, distance, time) => {
      if (distance > record) {
        timesThatBeatRecord.push(time);
      }
      return timesThatBeatRecord;
    },
    []
  );
  return possibleMs.length;
};
