import { Graph } from "./Graph.ts";
import { Node } from "./Node.ts";

export class Pathfinding {
  protected graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  // Prints out the path found by FindPath
  printPath(path: string[], graph: Graph) {
    console.log("Path to destination:");
    path.forEach(function (value: string) {
      const node = graph.getNode(value);
      if (node instanceof Node) {
        console.log(node.getLongName());
      } else {
        console.log("NodeID does not exist, path is invalid");
      }
    });
  }

  // Just a parent function
  findPath(srcID: string, destID: string): string[] | undefined {
    console.log(srcID + destID);
    return undefined;
  }
}
