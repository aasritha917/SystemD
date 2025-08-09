type Direction = 'UP' | 'DOWN' | 'IDLE';
type ElevatorState = 'MOVING' | 'OPEN_DOOR' | 'CLOSE_DOOR';

interface Passenger {
  weight: number;
}

class Elevator {
  id: number;
  currentFloor: number;
  direction: Direction;
  state: ElevatorState;
  capacityPeople: number;
  capacityWeight: number;
  passengers: Passenger[];
  targetFloors: number[];

  constructor(id: number) {
    this.id = id;
    this.currentFloor = 1;
    this.direction = 'IDLE';
    this.state = 'CLOSE_DOOR';
    this.capacityPeople = 8;
    this.capacityWeight = 680;
    this.passengers = [];
    this.targetFloors = [];
  }

  get totalWeight(): number {
    return this.passengers.reduce((sum, p) => sum + p.weight, 0);
  }

  canAddPassenger(passenger: Passenger): boolean {
    return (
      this.passengers.length < this.capacityPeople &&
      this.totalWeight + passenger.weight <= this.capacityWeight
    );
  }

  addPassenger(passenger: Passenger): boolean {
    if (this.canAddPassenger(passenger)) {
      this.passengers.push(passenger);
      return true;
    }
    return false;
  }

  removePassengersAtFloor(floor: number) {
    this.passengers = this.passengers.filter(() => Math.random() > 0.5);
  }

  moveOneFloor() {
    if (this.direction === 'UP') this.currentFloor++;
    else if (this.direction === 'DOWN') this.currentFloor--;
  }

  openDoor() {
    this.state = 'OPEN_DOOR';
  }

  closeDoor() {
    this.state = 'CLOSE_DOOR';
  }

  setTarget(floor: number) {
    if (!this.targetFloors.includes(floor)) this.targetFloors.push(floor);
  }

  step() {
    if (this.targetFloors.length === 0) {
      this.direction = 'IDLE';
      return;
    }
    const target = this.targetFloors[0];
    if (this.currentFloor < target) {
      this.direction = 'UP';
      this.state = 'MOVING';
      this.moveOneFloor();
    } else if (this.currentFloor > target) {
      this.direction = 'DOWN';
      this.state = 'MOVING';
      this.moveOneFloor();
    } else {
      this.openDoor();
      this.removePassengersAtFloor(target);
      this.targetFloors.shift();
      this.closeDoor();
      if (this.targetFloors.length === 0) this.direction = 'IDLE';
    }
  }
}

class ElevatorSystem {
  elevators: Elevator[];
  pendingRequests: { from: number; to: number; passenger: Passenger }[];

  constructor(count: number) {
    this.elevators = Array.from({ length: count }, (_, i) => new Elevator(i + 1));
    this.pendingRequests = [];
  }

  requestElevator(from: number, to: number, passenger: Passenger) {
    const elevator = this.findBestElevator(from);
    if (elevator && elevator.canAddPassenger(passenger)) {
      elevator.addPassenger(passenger);
      elevator.setTarget(from);
      elevator.setTarget(to);
    } else {
      this.pendingRequests.push({ from, to, passenger });
    }
  }

  findBestElevator(floor: number): Elevator | null {
    let best: Elevator | null = null;
    let minDistance = Infinity;
    for (const e of this.elevators) {
      if (e.state === 'MOVING' && e.direction === 'UP' && floor < e.currentFloor) continue;
      if (e.state === 'MOVING' && e.direction === 'DOWN' && floor > e.currentFloor) continue;
      const distance = Math.abs(e.currentFloor - floor);
      if (distance < minDistance && e.passengers.length < e.capacityPeople) {
        minDistance = distance;
        best = e;
      }
    }
    return best;
  }

  step() {
    for (const e of this.elevators) e.step();
    const remaining: typeof this.pendingRequests = [];
    for (const r of this.pendingRequests) {
      const elevator = this.findBestElevator(r.from);
      if (elevator && elevator.canAddPassenger(r.passenger)) {
        elevator.addPassenger(r.passenger);
        elevator.setTarget(r.from);
        elevator.setTarget(r.to);
      } else {
        remaining.push(r);
      }
    }
    this.pendingRequests = remaining;
  }

  status() {
    return this.elevators.map(e => ({
      id: e.id,
      floor: e.currentFloor,
      direction: e.direction,
      state: e.state,
      occupancy: `${e.passengers.length}/${e.capacityPeople}`,
      weight: `${e.totalWeight}/${e.capacityWeight}`
    }));
  }
}

const system = new ElevatorSystem(3);
system.requestElevator(3, 7, { weight: 70 });
system.requestElevator(5, 1, { weight: 80 });

for (let i = 0; i < 10; i++) {
  system.step();
  console.log(system.status());
}
