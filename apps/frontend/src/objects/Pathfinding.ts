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
    for (let i = 0; i < path.length - 1; i++) {
      // Special case for start node
      if (i == 0) {
        const nextNode = this.graph.getNode(path[1]);
        if (nextNode) {
          directions.push(`Start towards ${nextNode.getLongName()}`);
        }
      } else {
        const prevNode = this.graph.getNode(path[i - 1]);
        const nextNode = this.graph.getNode(path[i + 1]);
        const currNode = this.graph.getNode(path[i]);

        if (prevNode && nextNode && currNode) {
          switch (this.getMovement(nextNode, prevNode, currNode)) {
            case "forward":
              directions.push(`Continue straight at ${currNode.getLongName()}`);
              break;
            case "right":
              directions.push(`Turn right at ${currNode.getLongName()}`);
              break;
            case "left":
              directions.push(`Turn left at ${currNode.getLongName()}`);
              break;
          }
        }
      }
    }

    console.log(directions);
    return directions;
  }

  /* Gets the direction the user is moving in
    1 or -1 is its respective driection on x
    2 or -2 is its respective direction in the y direction
   */
  private getMovement(
    nextNode: MapNode,
    prevNode: MapNode,
    currNode: MapNode,
  ): string {
    const xMovement = currNode.getX() - prevNode.getX();
    const yMovement = currNode.getY() - prevNode.getY();
    const xMovementNext = nextNode.getX() - currNode.getX();
    const yMovementNext = nextNode.getY() - currNode.getY();
    const hypotenusePrev = this.getEuclidian(prevNode, currNode);
    const hypotenuseNext = this.getEuclidian(currNode, nextNode);
    let anglePrev = Math.acos(xMovement / hypotenusePrev);
    let angleNext = Math.acos(xMovementNext / hypotenuseNext);

    // Trig to get direction of movement
    if (yMovement < 0) anglePrev += Math.PI;

    // Get the new direction of movement
    if (yMovementNext < 0) angleNext += Math.PI;

    const diff = angleNext - anglePrev;

    console.log(anglePrev, angleNext, diff);

    if (this.forward(diff)) return "forward";
    else if (this.left(diff)) {
      return "left";
    }
    return "right";
  }

  private getEuclidian(node1: MapNode, node2: MapNode): number {
    return Math.sqrt(
      (node2.getX() - node1.getX()) ** 2 + (node2.getY() - node1.getY()) ** 2,
    );
  }

  private forward(diff: number) {
    return (
      (diff < Math.PI / 4 && diff > -Math.PI / 4) ||
      (diff > (7 * Math.PI) / 4 && diff < 9 * Math.PI) ||
      diff > 15 * Math.PI ||
      diff < -7 * Math.PI
    );
  }

  private left(diff: number) {
    return (
      (diff > 0 && diff < Math.PI) ||
      (diff > 2 * Math.PI && diff < 3 * Math.PI) ||
      (diff > -Math.PI && diff < -2 * Math.PI)
    );
  }
}
