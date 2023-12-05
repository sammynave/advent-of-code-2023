import { range } from "../utils";

class SourceDestinationMap {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;

  constructor({ destinationRangeStart, sourceRangeStart, rangeLength }) {
    this.destinationRangeStart = destinationRangeStart;
    this.sourceRangeStart = sourceRangeStart;
    this.rangeLength = rangeLength;
  }

  getDestinationFromSource(source) {
    const sourceRange = range({
      from: this.sourceRangeStart,
      to: this.sourceRangeStart + this.rangeLength,
      inclusive: false,
    });
    const sourceStart = this.sourceRangeStart;
    const sourceEnd = this.sourceRangeStart + this.rangeLength - 1;

    console.log({
      start: sourceRange[0] === sourceStart,
      end: sourceRange[sourceRange.length - 1] === sourceEnd,
    });

    const idx = sourceRange.indexOf(source);
    if (idx > -1) {
      return range({
        from: this.destinationRangeStart,
        to: this.destinationRangeStart + this.rangeLength,
        inclusive: false,
      })[idx];
    } else {
      return false;
    }
  }
}

class SourceDestination {
  maps: SourceDestinationMap[] = [];
  name: string;

  constructor({ name, maps }) {
    this.name = name;
    this.maps = maps;
  }

  getDestinationFromSource(source) {
    const map = this.maps.find((map) => {
      return map.getDestinationFromSource(source);
    });
    return map?.getDestinationFromSource(source) ?? source;
  }
}

const convertToMaps = (strMaps: string[]) => {
  const maps: SourceDestination[] = [];
  strMaps.forEach((strMap) => {
    const [strKey, ...strVals] = strMap.split("\n");
    const name = strKey.split(" ")[0];
    maps.push(
      new SourceDestination({
        name,
        maps: strVals.map((strVal) => {
          const [destinationRangeStart, sourceRangeStart, rangeLength] = strVal
            .split(" ")
            .map(Number);

          return new SourceDestinationMap({
            destinationRangeStart,
            sourceRangeStart,
            rangeLength,
          });
        }),
      })
    );
  });

  return maps;
};

export const part1 = (input) => {
  const [seedStr, ...mapsStr] = input.split("\n\n");
  let lowestLocation = Infinity;
  const seeds: number[] = seedStr.match(/\d+/g).map(Number);
  const maps = convertToMaps(mapsStr);
  seeds.forEach((seed) => {
    let nextSourceId = seed;
    maps.forEach((map) => {
      if (map.name === "humidity-to-location") {
        const location = map.getDestinationFromSource(nextSourceId);
        if (location < lowestLocation) {
          lowestLocation = location;
        }
      } else {
        nextSourceId = map.getDestinationFromSource(nextSourceId);
      }
    });
  });

  return lowestLocation;
};

export const part2 = (input) => {};
