import { Graph } from "./Graph.ts";
import { MapNode } from "./MapNode.ts";

export interface IPathfinding {
  findPath(src: string, dst: string): string[] | undefined;
}

export class Pathfinding {
  private _pathAlgo: IPathfinding | undefined;
  protected graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  get pathAlgo(): IPathfinding | undefined {
    return this._pathAlgo;
  }

  setPathAlgo(newAlgo: IPathfinding): string {
    this._pathAlgo = newAlgo;
    return "";
  }

  // Prints out the path found by FindPath
  printPath(path: string[], graph: Graph) {
    console.log("Path to destination:");
    path.forEach(function (value: string) {
      const node = graph.getNode(value);
      if (node instanceof MapNode) {
        console.log(node.getLongName());
      } else {
        console.log("NodeID does not exist, path is invalid");
      }
    });
  }

  // Just a parent function
  findPath(srcID: string, destID: string): string[] | undefined {
    return this._pathAlgo?.findPath(srcID, destID);
  }

  getDirections(path: string[]) {
    const directions: string[] = [];
    for (let i = 0; i < path.length; i++) {
      if (i == 0) {
        const nextNode = this.graph.getNode(path[1]);
        const futureNode = this.graph.getNode(path[2]);
        if (nextNode != undefined && futureNode != undefined) {
          if (nextNode.getNodeType() == "HALL") {
            directions.push(
              "Take " +
                nextNode.getLongName() +
                " going towards " +
                futureNode.getLongName(),
            );
          } else {
            directions.push(
              "Go by " +
                nextNode.getLongName() +
                " going towards " +
                futureNode.getLongName(),
            );
          }
        }
      }
    }
  }
}
