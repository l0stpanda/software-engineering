import { MapNode } from "./MapNode.ts";
import { calculateFloorWeight } from "./FloorInfo.ts";

export class MapEdge {
  private node1: MapNode;
  private node2: MapNode;
  private weight: number;

  constructor(node1: MapNode, node2: MapNode) {
    this.node1 = node1;
    this.node2 = node2;
    this.weight = this.calculateWeight();
  }

  private calculateWeight() {
    const x = this.node2.getX() - this.node1.getX();
    const y = this.node2.getY() - this.node1.getY();
    // The weight due to being on different floors
    const z = calculateFloorWeight(
      this.node1.getFloor(),
      this.node2.getFloor(),
    );

    // Sanity Check
    if (z == undefined) {
      console.error("Invalid floors");
      return 0;
    }

    // Distance formula
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }

  // Gets the node adjacent to the given node
  getOther(node: MapNode) {
    switch (node == this.node1) {
      case true:
        return this.node2;

      case false:
        return this.node1;
    }
  }

  getWeight() {
    return this.weight;
  }

  getNodes() {
    return [this.node1, this.node2];
  }
}
