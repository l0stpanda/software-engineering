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

  // Just a parent function
  findPath(srcID: string, destID: string): string[] | undefined {
    return this._pathAlgo?.findPath(srcID, destID);
  }

  /* Gets the direction the user is moving in
    1 or -1 is its respective driection on x
    2 or -2 is its respective direction in the y direction
   */
}

export function getDirections(path: string[], graph: Graph) {
  const directions: string[] = [];
  let changeFloors: string | undefined = undefined;
  for (let i = 0; i < path.length - 1; i++) {
    // Special case for start node
    if (i == 0) {
      const nextNode = graph.getNode(path[1]);
      const currNode = graph.getNode(path[0]);
      if (nextNode && currNode) {
        if (currNode.getFloor() != nextNode.getFloor()) {
          changeFloors = currNode.getLongName();
        } else {
          directions.push(`Start towards ${nextNode.getLongName()}`);
        }
      }
    } else {
      const prevNode = graph.getNode(path[i - 1]);
      const nextNode = graph.getNode(path[i + 1]);
      const currNode = graph.getNode(path[i]);

      if (prevNode && nextNode && currNode) {
        if (!changeFloors && nextNode.getFloor() == currNode.getFloor()) {
          switch (getMovement(nextNode, prevNode, currNode)) {
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
        } else if (!changeFloors) {
          changeFloors = currNode.getLongName();
        } else if (changeFloors && nextNode.getFloor() == currNode.getFloor()) {
          directions.push(
            `Take ${changeFloors} to floor ${currNode.getFloor()}`,
          );
          changeFloors = undefined;
          i--;
        }
      }
    }
  }

  console.log(directions);

  return directions;
}

function getMovement(
  nextNode: MapNode,
  prevNode: MapNode,
  currNode: MapNode,
): string {
  const xMovement = currNode.getX() - prevNode.getX();
  const yMovement = prevNode.getY() - currNode.getY();
  const xMovementNext = nextNode.getX() - currNode.getX();
  const yMovementNext = currNode.getY() - nextNode.getY();
  const hypotenusePrev = getEuclidian(prevNode, currNode);
  const hypotenuseNext = getEuclidian(currNode, nextNode);
  let anglePrev = Math.acos(xMovement / hypotenusePrev);
  let angleNext = Math.acos(xMovementNext / hypotenuseNext);

  // Trig to get direction of movement
  if (yMovement < 0) anglePrev = -anglePrev;

  // Get the new direction of movement
  if (yMovementNext < 0) angleNext = -angleNext;

  const diff = angleNext - anglePrev;

  if (forward(diff)) return "forward";
  else if (left(diff)) {
    return "left";
  }
  return "right";
}

function getEuclidian(node1: MapNode, node2: MapNode): number {
  return Math.sqrt(
    (node2.getX() - node1.getX()) ** 2 + (node2.getY() - node1.getY()) ** 2,
  );
}

function forward(diff: number) {
  return (
    (diff < Math.PI / 4 && diff > -Math.PI / 4) ||
    (diff > (7 * Math.PI) / 4 && diff < (9 * Math.PI) / 4) ||
    (diff < (-7 * Math.PI) / 4 && diff > (-9 * Math.PI) / 4) ||
    (diff > (15 * Math.PI) / 4 && diff < (17 * Math.PI) / 4) ||
    (diff < (-15 * Math.PI) / 4 && diff > (-17 * Math.PI) / 4)
  );
}

function left(diff: number) {
  return (
    (diff > 0 && diff < Math.PI) ||
    (diff > 2 * Math.PI && diff < 3 * Math.PI) ||
    (diff > -2 * Math.PI && diff < -Math.PI) ||
    (diff > 4 * Math.PI && diff < 5 * Math.PI) ||
    (diff > -4 * Math.PI && diff < -3 * Math.PI)
  );
}
