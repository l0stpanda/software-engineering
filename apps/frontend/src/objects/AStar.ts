import { MapNode } from "./MapNode.ts";
import { calculateFloorWeight } from "./FloorInfo.ts";
import { WeightedPathfinding } from "./WeightedPathfinding.ts";
import { Graph } from "./Graph.ts";

export class AStar extends WeightedPathfinding {
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
      return [0, this.heuristic(start, goal)];
    }

    if (gScoreNeighbor == undefined) gScoreNeighbor = Number.POSITIVE_INFINITY;

    gScoreCurrent += weight;

    return [
      gScoreCurrent,
      gScoreNeighbor,
      gScoreCurrent + this.heuristic(neighbor, goal),
    ];
  }

  // Heuristic function for A*
  private heuristic(node: MapNode, goal: MapNode): number {
    const x = goal.getX() - node.getX();
    const y = goal.getY() - node.getY();
    // The weight due to being on different floors
    const z = calculateFloorWeight(goal.getFloor(), node.getFloor());

    // Sanity Check
    if (z == undefined) {
      console.error("Invalid floors");
      return Number.POSITIVE_INFINITY;
    }

    // Distance formula
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }
}
