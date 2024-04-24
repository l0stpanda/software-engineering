import { MapNode } from "./MapNode.ts";
import { WeightedPathfinding } from "./WeightedPathfinding.ts";
import { Graph } from "./Graph.ts";

export class Dijkstra extends WeightedPathfinding {
  constructor(graph: Graph) {
    super(graph);
  }

  protected getScores(
    start: MapNode,
    neighbor: MapNode,
    goal: MapNode,
    weight: number,
    gScoreCurrent: number | undefined,
    gScoreNeighbor: number | undefined,
  ): number[] {
    if (gScoreCurrent == undefined) {
      return [0, 0];
    }

    if (gScoreNeighbor == undefined) gScoreNeighbor = Number.POSITIVE_INFINITY;

    gScoreCurrent += weight;

    return [gScoreCurrent, gScoreNeighbor, gScoreCurrent];
  }
}
