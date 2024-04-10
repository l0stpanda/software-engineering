import { Pathfinding } from "./Pathfinding.ts";
import { MapNode } from "./MapNode.ts";
import { calculateFloorWeight } from "./FloorInfo.ts";

export class AStar extends Pathfinding {
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
    gScores.set(start, 0);
    fScores.set(start, this.heuristic(start, goal));

    // Start of the algorithm
    while (priorityQueue.length != 0) {
      const current = priorityQueue.pop();

      if (current == undefined) return undefined;

      // Reconstruct the path on completion
      if (current == goal) {
        return this.reconstructPath(current, cameFrom);
      }

      const edges = current.getEdgeList();

      for (let i = 0; i < edges.length; i++) {
        const neighbor = edges[i].getOther(current);
        let tentativeGScore = gScores.get(current);

        if (tentativeGScore == undefined) return undefined;

        tentativeGScore += edges[i].getWeight();
        let neighborGScore = gScores.get(neighbor);

        if (neighborGScore == undefined)
          neighborGScore = Number.POSITIVE_INFINITY;

        if (tentativeGScore < neighborGScore) {
          cameFrom.set(neighbor, current);
          gScores.set(neighbor, tentativeGScore);
          fScores.set(
            neighbor,
            tentativeGScore + this.heuristic(neighbor, goal),
          );
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

  private reconstructPath(
    goal: MapNode,
    cameFrom: Map<MapNode, MapNode>,
  ): string[] {
    let current: MapNode | undefined = goal;
    const path: string[] = [current.getNodeID()];

    while (cameFrom.has(<MapNode>current)) {
      current = cameFrom.get(<MapNode>current);
      if (current == undefined) return [];
      path.push(current.getNodeID());
    }

    return path;
  }
}
