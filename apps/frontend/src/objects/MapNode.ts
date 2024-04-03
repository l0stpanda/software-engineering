export class MapNode {
  private nodeID: string;
  private xcoord: number;
  private ycoord: number;
  private floor: string;
  private building: string;
  private nodeType: string;
  private longName: string;
  private shortName: string;
  private nodeList: MapNode[];

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
    this.nodeList = [];
  }

  // Add given node to adjacency list
  addAdjacency(node: MapNode) {
    this.nodeList.push(node);
  }

  getNodeID() {
    return this.nodeID;
  }

  getNodeList() {
    return this.nodeList;
  }

  getLongName() {
    return this.longName;
  }

  getNodeType() {
    return this.nodeType;
  }

  getX() {
    return this.xcoord;
  }

  getY() {
    return this.ycoord;
  }
}
