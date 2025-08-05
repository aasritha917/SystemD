enum VehicleType {
  BIKE = "BIKE",
  CAR = "CAR",
  TRUCK = "TRUCK",
  EV_CAR = "EV_CAR",
}

abstract class Vehicle {
  constructor(public number: string, public type: VehicleType) {}
}

class Car extends Vehicle {
  constructor(number: string) {
    super(number, VehicleType.CAR);
  }
}

class EVCar extends Vehicle {
  constructor(number: string) {
    super(number, VehicleType.EV_CAR);
  }
}

enum SlotType {
  GENERAL = "GENERAL",
  EV_RESERVED = "EV_RESERVED",
}

class ParkingSlot {
  vehicle: Vehicle | null = null;
  constructor(
    public id: string,
    public slotType: SlotType,
    public floor: number
  ) {}

  isAvailable(): boolean {
    return this.vehicle === null;
  }

  park(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }

  unpark(): Vehicle | null {
    const temp = this.vehicle;
    this.vehicle = null;
    return temp;
  }
}

class Ticket {
  constructor(
    public ticketId: string,
    public vehicle: Vehicle,
    public slot: ParkingSlot,
    public entryTime: Date
  ) {}
}

class Receipt {
  constructor(
    public ticket: Ticket,
    public exitTime: Date,
    public totalFee: number
  ) {}

  print() {
    console.log(`Vehicle: ${this.ticket.vehicle.number}`);
    console.log(`Type: ${this.ticket.vehicle.type}`);
    console.log(`Slot: ${this.ticket.slot.id}`);
    console.log(`Entry: ${this.ticket.entryTime}`);
    console.log(`Exit: ${this.exitTime}`);
    console.log(`Total Fee: ₹${this.totalFee}`);
  }
}

interface ParkingStrategy {
  findSlot(
    slots: ParkingSlot[],
    vehicleType: VehicleType
  ): ParkingSlot | null;
}

class NearestAvailableStrategy implements ParkingStrategy {
  findSlot(
    slots: ParkingSlot[],
    vehicleType: VehicleType
  ): ParkingSlot | null {
    if (vehicleType === VehicleType.EV_CAR) {
      const reserved = slots.find(
        (s) => s.slotType === SlotType.EV_RESERVED && s.isAvailable()
      );
      if (reserved) return reserved;
    }
    return slots.find((s) => s.slotType === SlotType.GENERAL && s.isAvailable()) || null;
  }
}

class ParkingLot {
  private slots: ParkingSlot[] = [];
  private tickets: Map<string, Ticket> = new Map();
  private strategy: ParkingStrategy = new NearestAvailableStrategy();
  private floorCount = 2;
  private slotsPerFloor = 5;

  constructor() {
    this.initialize();
  }

  private initialize() {
    for (let floor = 1; floor <= this.floorCount; floor++) {
      for (let i = 0; i < this.slotsPerFloor; i++) {
        const id = `F${floor}S${i + 1}`;
        const slotType = i === 0 ? SlotType.EV_RESERVED : SlotType.GENERAL;
        this.slots.push(new ParkingSlot(id, slotType, floor));
      }
    }
  }

  parkVehicle(vehicle: Vehicle): Ticket {
    const slot = this.strategy.findSlot(this.slots, vehicle.type);
    if (!slot) throw new Error("No available slot");

    slot.park(vehicle);
    const ticket = new Ticket(
      `T-${Date.now()}`,
      vehicle,
      slot,
      new Date()
    );
    this.tickets.set(ticket.ticketId, ticket);
    console.log(`Parked at ${slot.id}, Ticket: ${ticket.ticketId}`);
    return ticket;
  }

  unparkVehicle(ticketId: string): Receipt {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) throw new Error("Invalid ticket");

    const exitTime = new Date();
    const durationMs = exitTime.getTime() - ticket.entryTime.getTime();
    const hours = Math.ceil(durationMs / (1000 * 60 * 60));
    const rate = RateCard[ticket.vehicle.type];
    const fee = hours * rate;

    ticket.slot.unpark();
    this.tickets.delete(ticketId);

    const receipt = new Receipt(ticket, exitTime, fee);
    receipt.print();
    return receipt;
  }
}

const RateCard: Record<VehicleType, number> = {
  [VehicleType.CAR]: 20,
  [VehicleType.EV_CAR]: 25,
  [VehicleType.BIKE]: 10,
  [VehicleType.TRUCK]: 30,
};


const lot = new ParkingLot();

const v1 = new EVCar("EV123");
const ticket1 = lot.parkVehicle(v1);

setTimeout(() => {
  lot.unparkVehicle(ticket1.ticketId);
}, 2000); 
