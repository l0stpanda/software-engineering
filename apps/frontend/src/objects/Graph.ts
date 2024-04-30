import { MapNode } from "./MapNode.ts";
import { Nodes, Edges } from "database";
import axios from "axios";
import { MapEdge } from "./MapEdge.ts";

export class Graph {
  private adjMap: Map<string, MapNode>; // Map<nodeID, Node object>
  private nameMap: Map<string, string>;

  constructor() {
    this.adjMap = new Map<string, MapNode>();
    this.nameMap = new Map<string, string>();
  }

  // Add a node to the graph
  async addNode(node: MapNode) {
    this.adjMap.set(node.getNodeID(), node);
    this.nameMap.set(node.getLongName(), node.getNodeID());
  }

  // Add an edge to the graph
  async addEdge(srcID: string, destID: string) {
    const srcNode = this.adjMap.get(srcID);
    const destNode = this.adjMap.get(destID);

    if (srcNode instanceof MapNode && destNode instanceof MapNode) {
      const edge = new MapEdge(srcNode, destNode);
      srcNode.addAdjacency(edge);
      destNode.addAdjacency(edge);
    } else {
      console.log("Edge is incomplete or a node does not exist");
    }
  }

  async getAllEdges() {
    return await axios
      .get("/api/import/edgesGet")
      .then((response) => response.data);
  }

  async getAllNodes() {
    return await axios
      .get("/api/import/nodesGet")
      .then((response) => response.data);
  }

  async loadGraph(): Promise<void> {
    const nodes: Nodes[] = await this.getAllNodes();
    const edges: Edges[] = await this.getAllEdges();
    console.log(edges);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const x_coordinate = parseInt(node.x_c);
      const y_coordinate = parseInt(node.y_c);
      if (!isNaN(x_coordinate) || !isNaN(y_coordinate)) {
        const new_node: MapNode = new MapNode(
          node.node_id,
          x_coordinate,
          y_coordinate,
          node.floor,
          node.building,
          node.node_type,
          node.long_name,
          node.short_name.replace("\r", ""),
        );
        await this.addNode(new_node);
      }
    }

    for (let i = 0; i < edges.length; i++) {
      const src_node = edges[i].start_node;
      const dest_node = edges[i].end_node.replace("\r", "");
      await this.addEdge(src_node, dest_node);
    }
  }

  getMap() {
    return this.adjMap;
  }

  getNode(nodeID: string) {
    return this.adjMap.get(nodeID);
  }

  idFromName(name: string) {
    return this.nameMap.get(name);
  }

  getNodesByFloor(floor: string): MapNode[] {
    const nodes = this.adjMap.values();
    const result: MapNode[] = [];

    for (const node of nodes) {
      if (node.getFloor() == floor) {
        result.push(node);
      }
    }

    return result;
  }

  removeNode(node: MapNode) {
    this.adjMap.delete(node.getNodeID());
    this.nameMap.delete(node.getLongName());
    node.getEdgeList().forEach((edge: MapEdge) => {
      const other = edge.getOther(node);
      other.getEdgeList().splice(other.getEdgeList().indexOf(edge), 1);
    });
  }
}
