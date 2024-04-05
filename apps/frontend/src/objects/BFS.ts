import { Pathfinding } from "./Pathfinding.ts";
import { MapNode } from "./MapNode.ts";

export class BFS extends Pathfinding {
  // Breadth first search pathfinding method
  findPath(src: string, dest: string) {
    const visited: Map<string, number> = new Map<string, number>();
    const pathStorage: Map<string, string> = new Map<string, string>();
    const queue: Array<MapNode> = [];
    const path: Array<string> = [];

    const srcNode: MapNode | undefined = this.graph.getMap().get(src);
    const destNode: MapNode | undefined = this.graph.getMap().get(dest);
    if (srcNode instanceof MapNode && destNode instanceof MapNode) {
      queue.push(srcNode);

      while (queue.length != 0) {
        const currNode: MapNode | undefined = queue.pop();

        if (currNode instanceof MapNode) {
          if (currNode == destNode) {
            // Get the shortest path
            let currID = currNode.getNodeID();
            path.push(currID);

            while (currID != src) {
              const pathID = pathStorage.get(currID);
              if (pathID != undefined) {
                path.splice(0, 0, pathID);
                currID = pathID;
              }
            }

            return path;
          }
          visited.set(currNode.getNodeID(), 1);

          // Add unvisited nodes to the queue
          currNode.getEdgeList().forEach(function (edge) {
            const childNode = edge.getOther(currNode);

            if (visited.get(childNode.getNodeID()) == undefined) {
              queue.splice(0, 0, childNode); // queue pops from end of list
              if (currNode != undefined) {
                pathStorage.set(childNode.getNodeID(), currNode.getNodeID()); // Store the parent
              }
            }
          });
        }
      }
    }
    return undefined;
  }
}
