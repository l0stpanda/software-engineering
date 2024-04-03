import { Graph } from "./Graph.ts";
import { MapNode } from "./MapNode.ts";

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
      if (node instanceof MapNode) {
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

  getDirections(path: string[]) {
    const directions: string[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      // Special case for start node
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
      } else {
        const prevNode = this.graph.getNode(path[i - 1]);
        const nextNode = this.graph.getNode(path[i + 1]);
        const currNode = this.graph.getNode(path[i]);

        if (
          prevNode != undefined &&
          nextNode != undefined &&
          currNode != undefined
        ) {
          const movements = this.getMovement(nextNode, prevNode, currNode);
          const xDirection = movements[0];
          const yDirection = movements[1];
          const moveDirection = movements[2];

          if (xDirection != 0 && yDirection != 0) {
            switch (moveDirection) {
              // Going East
              case 1:
                if (yDirection < 0) {
                  directions.push("Turn left at " + currNode.getLongName());
                } else {
                  directions.push("Turn right at " + currNode.getLongName());
                }
                break;

              // Going West
              case -1:
                if (yDirection > 0) {
                  directions.push("Turn left at " + currNode.getLongName());
                } else {
                  directions.push("Turn right at " + currNode.getLongName());
                }
                break;

              // Going South
              case 2:
                if (xDirection > 0) {
                  directions.push("Turn left at " + currNode.getLongName());
                } else {
                  directions.push("Turn right at " + currNode.getLongName());
                }
                break;

              // Going North
              case -2:
                if (xDirection < 0) {
                  directions.push("Turn left at " + currNode.getLongName());
                } else {
                  directions.push("Turn right at " + currNode.getLongName());
                }
                break;

              default:
                console.error("How did we get here?");
                break;
            }
          } else {
            if (i == path.length - 2) {
              directions.push("Go straight to your destination");
            } else {
              directions.push(
                "Continue straight past " + currNode.getLongName(),
              );
            }
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
  private getMovement(nextNode: MapNode, prevNode: MapNode, currNode: MapNode) {
    const movements: number[] = [];
    movements.push(prevNode.getX() - nextNode.getX());
    movements.push(nextNode.getY() - prevNode.getY());
    const xMovement = prevNode.getX() - currNode.getX();
    const yMovement = currNode.getY() - prevNode.getY();

    switch (xMovement) {
      case 0:
        movements.push(2 * (yMovement / Math.abs(yMovement)));
        break;

      default:
        movements.push(xMovement / Math.abs(xMovement));
        break;
    }

    return movements;
  }
}
