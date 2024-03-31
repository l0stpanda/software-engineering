import { Node } from "./Node";

export class Graph {
  private adjMap: Map<string, Node>; // Map<nodeID, Node object>
  private nameMap: Map<string, string>;

  constructor(adjMap: Map<string, Node>) {
    this.adjMap = adjMap;
    this.nameMap = new Map<string, string>();
  }

  // Add a node to the graph
  addNode(node: Node) {
    this.adjMap.set(node.getNodeID(), node);
    this.nameMap.set(node.getLongName(), node.getNodeID());
  }

  // Add an edge to the graph
  addEdge(srcID: string, destID: string) {
    const srcNode = this.adjMap.get(srcID);
    const destNode = this.adjMap.get(destID);

    if (srcNode instanceof Node && destNode instanceof Node) {
      srcNode.addAdjacency(destNode);
      destNode.addAdjacency(srcNode);
    } else {
      console.log("Edge is incomplete or a node does not exist");
    }
  }

  getMap() {
    return this.adjMap;
  }

  getNode(nodeID: string) {
    return this.adjMap.get(nodeID);
  }

  nodeFromName(name: string) {
    const id = this.idFromName(name);

    if (id != undefined) {
      return this.adjMap.get(id);
    }

    return undefined;
  }

  idFromName(name: string) {
    return this.nameMap.get(name);
  }
}
