import { Node } from "./Node";
import axios from "axios";

export class Graph {
  private adjMap: Map<string, Node>; // Map<nodeID, Node object>
  private nameMap: Map<string, string>;

  constructor(adjMap: Map<string, Node>) {
    this.adjMap = adjMap;
    this.nameMap = new Map<string, string>();
  }

  // Add a node to the graph
  async addNode(node: Node) {
    this.adjMap.set(node.getNodeID(), node);
    this.nameMap.set(node.getLongName(), node.getNodeID());
  }

  // Add an edge to the graph
  async addEdge(srcID: string, destID: string) {
    const srcNode = this.adjMap.get(srcID);
    const destNode = this.adjMap.get(destID);

    if (srcNode instanceof Node && destNode instanceof Node) {
      srcNode.addAdjacency(destNode);
      destNode.addAdjacency(srcNode);
    } else {
      console.log("Edge is incomplete or a node does not exist");
    }
  }

  async getAllEdges() {
    const res = await axios.get("/api/import", {
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      console.log("success");
    } else {
      console.log(res.statusText);
    }
    //This is the json crap
    return res.data;
  }

  async getAllNodes() {
    const res = await axios.get("/api/importN").then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        console.log("success");
      } else {
        console.log(response.statusText);
      }
      //This is the json crap
      return response.data;
    });
    //{
    //headers: { "Content-Type": "application/json" },
    //});
    if (res.status == 200) {
      console.log("success");
    } else {
      console.log(res.statusText);
    }
    //This is the json crap
    return res.data;
  }

  async loadGraph() {
    const nodes = await JSON.parse(await this.getAllNodes());
    const edges = await JSON.parse(await this.getAllEdges());

    console.log(nodes);
    console.log(edges);
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
