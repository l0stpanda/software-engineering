import FloorNode from "./FloorNode.tsx";
import lowerLevel1 from "./00_thelowerlevel1.png";
import { useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { Node } from "../objects/Node.ts";

export interface InputNode {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

export interface Edge {
  startNodeID: string;
  endNodeID: string;
}

function FloorMap() {
  const [nodes, setNodes] = useState<InputNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  setEdges([]);
  setNodes([]);
  // useEffect(() => {
  //     const fetchNodeData = async () => {
  //     try {
  //         const response = await;
  //         const text = await response.text();
  //         const result = Papa.parse(text, {header: true});
  //
  //         const nodesData: InputNode[] = result.data.map((row: any) => ({
  //             nodeID: row.nodeID,
  //             xcoord: row.xcoord,
  //             ycoord: row.ycoord,
  //             floor: row.floor,
  //             building: row.building,
  //             nodeType: row.nodeID,
  //             longName: row.longName,
  //             shortName: row.shortName,
  //         }));
  //         setNodes(nodesData);
  //
  //
  //         const response2 = await fetch('csv_files/L1Edges.csv');
  //         const text2 = await response2.text();
  //         const result2 = Papa.parse(text2, {header: true});
  //
  //         const edgeData: Edge[] = result2.data.map((row: any) => ({
  //             startNodeID: row.startNodeID,
  //             endNodeID: row.endNodeID,
  //         }));
  //         setEdges(edgeData);
  //
  //
  //     } catch (error) {
  //         console.error("Error fetching or parsing CSV: ", error);
  //     }
  // };
  //
  //     fetchNodeData();
  // });

  const graphMap = () => {
    const graph: Graph = new Graph(new Map<string, Node>());

    // Parses out each node and adds it to the graph
    nodes.forEach(function (inputNode) {
      const nodeID = inputNode.nodeID;
      const xcoord = inputNode.xcoord;
      const ycoord = inputNode.ycoord;
      const floor = inputNode.floor;
      const building = inputNode.building;
      const nodeType = inputNode.nodeType;
      const longName = inputNode.longName;
      const shortName = inputNode.shortName;
      // Remove return character from the last element

      //shortName = shortName.replace("\r", "")
      graph.addNode(
        new Node(
          nodeID,
          xcoord,
          ycoord,
          floor,
          building,
          nodeType,
          longName,
          shortName,
        ),
      );
    });

    // Goes through each edge given and adds them to nodes adjacencies.
    edges.forEach(function (edge) {
      graph.addEdge(edge.startNodeID, edge.endNodeID);
    });
    return graph;
  };

  // useEffect(() => {
  //     const fetchEdgeData = async () => {
  //         try {
  //             const response = await fetch('csv_files/L1Edges.csv');
  //             const text = await response.text();
  //             const result = Papa.parse(text, {header: true});
  //
  //             const edgeData: Edge[] = result.data.map((row: any) => ({
  //                 startNodeID: row.startNodeID,
  //                 endNodeID: row.endNodeID,
  //             }));
  //             console.log(edgeData);
  //             setEdges(edgeData);
  //         } catch (error) {
  //             console.error("Error fetching or parsing CSV: ", error);
  //         }
  //     };
  //
  //     fetchEdgeData().then(r => {
  //         console.log(r);
  //     });
  //     console.log(edges);
  // });

  return (
    <>
      <h2>Floor With Nodes</h2>
      <FloorNode
        imageSrc={lowerLevel1}
        nodes={nodes}
        edges={edges}
        graph={graphMap()}
      />
    </>
  );
}

export default FloorMap;
