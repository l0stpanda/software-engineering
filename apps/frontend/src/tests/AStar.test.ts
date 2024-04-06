import { Graph } from "../objects/Graph.ts";
import { AStar } from "../objects/AStar.ts";

const graph = new Graph();
let aStar: AStar;
graph.loadGraph().then(() => {
  aStar = new AStar(graph);
  console.log(aStar);
});
