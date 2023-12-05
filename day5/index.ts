import { partition } from "../utils";

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
    const sourceStart = this.sourceRangeStart;
    const sourceEnd = sourceStart + this.rangeLength - 1;
    const idx = source - sourceStart;
    return source >= sourceStart && source <= sourceEnd
      ? this.destinationRangeStart + idx
      : false;
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
    // If it isn't found, then we assume the destination and source indexes are the same
    return map?.getDestinationFromSource(source) ?? source;
  }
}

const convertToMaps = (strMaps: string[]) => {
  const sourceDestinations: SourceDestination[] = [];
  strMaps.forEach((strMap) => {
    const [strKey, ...strVals] = strMap.split("\n");
    const name = strKey.split(" ")[0];
    const maps = strVals.map((strVal) => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = strVal
        .split(" ")
        .map(Number);

      return new SourceDestinationMap({
        destinationRangeStart,
        sourceRangeStart,
        rangeLength,
      });
    });
    sourceDestinations.push(
      new SourceDestination({
        name,
        maps,
      })
    );
  });
  return sourceDestinations;
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

type SeedRangeStart = number;
type SeedRangeLength = number;
function getLocations(maps) {
  return function* (seed, end) {
    while (seed <= end) {
      let nextSourceId = seed;
      let currentMapIdx = 0;
      while (currentMapIdx < maps.length) {
        const map = maps[currentMapIdx];
        if (map.name === "humidity-to-location") {
          yield map.getDestinationFromSource(nextSourceId);
        } else {
          nextSourceId = map.getDestinationFromSource(nextSourceId);
        }
        currentMapIdx++;
      }

      seed++;
    }
  };
}

function* outer(seeds, maps) {
  const gen = getLocations(maps);
  let lowestLocation = Infinity;
  let seedIdx = 0;
  while (seedIdx < seeds.length) {
    let [seed, seedLength] = seeds[seedIdx];
    const end = seed + seedLength - 1;
    for (let location of gen(seed, end)) {
      if (location < lowestLocation) {
        lowestLocation = location;
        yield lowestLocation;
      }
    }
    seedIdx++;
  }
}

// This finishes but takes 5 minutes
export const part2 = (input) => {
  const [seedStr, ...mapsStr] = input.split("\n\n");
  let lowestLocation = Infinity;
  const seeds: Array<[SeedRangeStart, SeedRangeLength]> = partition({
    array: seedStr.match(/\d+/g).map(Number),
    partitionSize: 2,
  });

  const maps = convertToMaps(mapsStr);

  for (let result of outer(seeds, maps)) {
    if (result < lowestLocation) {
      lowestLocation = result;
    }
  }

  return lowestLocation;
};
