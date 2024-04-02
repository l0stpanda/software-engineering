import React from "react";
import { Graph } from "../objects/Graph.ts";
import { MapNode } from "../objects/MapNode.ts";

export default function mapPage() {
  function test() {
    const graph: Graph = new Graph(new Map<string, MapNode>());
    console.log(graph);
  }

  return (
    <div className="w-100">
      <h1 onClick={test}>This is an example page.</h1>
      <button onClick={test}>Click me</button>
    </div>
  );
}
