import { Pathfinding } from "./Pathfinding.ts";
import { Graph } from "./Graph.ts";
import { MapNode } from "./MapNode.ts";

export abstract class WeightedPathfinding extends Pathfinding {
  constructor(graph: Graph) {
    super(graph);
  }

  findPath(srcID: string, destID: string): string[] | undefined {
    const priorityQueue: MapNode[] = [];
    const cameFrom = new Map<MapNode, MapNode>();
    const gScores = new Map<MapNode, number>();
    const fScores = new Map<MapNode, number>();

    const start = this.graph.getNode(srcID);
    const goal = this.graph.getNode(destID);

    if (start == undefined || goal == undefined) {
      console.error("Invalid nodes");
      return undefined;
    }

    priorityQueue.push(start);
    let scores = this.getScores(start, start, goal, 0, undefined, undefined);
    gScores.set(start, 0);
    fScores.set(start, scores[1]);

    // Start of the algorithm
    while (priorityQueue.length > 0) {
      const current = priorityQueue.pop();

      if (current == undefined) return undefined;

      // Reconstruct the path on completion
      if (current == goal) {
        return this.reconstructPath(current, cameFrom);
      }

      const edges = current.getEdgeList();

      for (let i = 0; i < edges.length; i++) {
        const neighbor = edges[i].getOther(current);
        scores = this.getScores(
          start,
          neighbor,
          goal,
          edges[i].getWeight(),
          gScores.get(current),
          gScores.get(neighbor),
        );

        if (scores[0] < scores[1]) {
          cameFrom.set(neighbor, current);
          gScores.set(neighbor, scores[0]);
          fScores.set(neighbor, scores[2]);

          if (!priorityQueue.includes(neighbor)) {
            priorityQueue.push(neighbor);
            priorityQueue.sort((node1, node2) => {
              let fScore1 = fScores.get(node1);
              let fScore2 = fScores.get(node2);

              if (fScore1 == undefined) fScore1 = Number.POSITIVE_INFINITY;
              if (fScore2 == undefined) fScore2 = Number.POSITIVE_INFINITY;

              return fScore2 - fScore1;
            });
          }
        }
      }
    }
  }

  protected reconstructPath(
    goal: MapNode,
    cameFrom: Map<MapNode, MapNode>,
  ): string[] {
    let current: MapNode | undefined = goal;
    const path: string[] = [current.getNodeID()];

    while (cameFrom.get(<MapNode>current) != undefined) {
      current = cameFrom.get(<MapNode>current);
      if (current == undefined) return [];
      path.push(current.getNodeID());
    }

    return path.reverse();
  }

  protected abstract getScores(
    start: MapNode,
    neighbor: MapNode,
    goal: MapNode,
    weight: number,
    gScoreCurrent: number | undefined,
    gScoreNeighbor: number | undefined,
  ): number[];
}
