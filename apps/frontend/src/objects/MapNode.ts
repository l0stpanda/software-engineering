import { MapEdge } from "./MapEdge.ts";

export class MapNode {
  private nodeID: string;
  private xcoord: number;
  private ycoord: number;
  private floor: string;
  private building: string;
  private nodeType: string;
  private longName: string;
  private shortName: string;
  private edgeList: MapEdge[];

  constructor(
    nodeID: string,
    xcoord: number,
    ycoord: number,
    floor: string,
    building: string,
    nodeType: string,
    longName: string,
    shortName: string,
  ) {
    this.nodeID = nodeID;
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.floor = floor;
    this.building = building;
    this.nodeType = nodeType;
    this.longName = longName;
    this.shortName = shortName;
    this.edgeList = [];
  }

  // Add given node to adjacency list
  addAdjacency(edge: MapEdge) {
    this.edgeList.push(edge);
  }

  getNodeID() {
    return this.nodeID;
  }

  getEdgeList() {
    return this.edgeList;
  }

  getLongName() {
    return this.longName;
  }

  getX() {
    return this.xcoord;
  }

  getY() {
    return this.ycoord;
  }

  getFloor() {
    return this.floor;
  }

  getShortName() {
    return this.shortName;
  }

  getBuilding() {
    return this.building;
  }

  getNodeType() {
    return this.nodeType;
  }

  setInfo(
    floor: string,
    nodeType: string,
    longName: string,
    shortName: string,
  ) {
    this.floor = floor;
    this.nodeType = nodeType;
    this.longName = longName;
    this.shortName = shortName;
  }

  setPosition(x: number, y: number) {
    this.xcoord = x;
    this.ycoord = y;
  }
}
