import { MapNode } from "./MapNode.ts";
import { Nodes, Edges } from "database";
import axios from "axios";

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
      srcNode.addAdjacency(destNode);
      destNode.addAdjacency(srcNode);
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
          node.short_name,
        );
        await this.addNode(new_node);
      }
    }

    for (let i = 0; i < edges.length; i++) {
      const src_node = edges[i].start_node;
      const dest_node = edges[i].end_node.split("\r")[0];
      await this.addEdge(src_node, dest_node);
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
