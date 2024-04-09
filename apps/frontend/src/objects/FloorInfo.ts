export const floors = ["L2", "L1", "1", "2", "3"];
const floorWeight = 100;

// Calculates the weight from distance between floors
export function calculateFloorWeight(floor1: string, floor2: string) {
  const f1 = floors.indexOf(floor1);
  const f2 = floors.indexOf(floor2);

  // Sanity Check
  if (f1 == -1 && f2 == -1) {
    console.error("Atleast one of the floors is invalid");
    return undefined;
  }

  return Math.abs(f2 - f1) * floorWeight;
}
