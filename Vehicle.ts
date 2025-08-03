// Vehicle interface
interface Vehicle {
  start(): void;
}

// Car class implements Vehicle
class Car implements Vehicle {
  start(): void {
    console.log("Car is starting");
  }
}

// Bike class implements Vehicle
class Bike implements Vehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

// Driver class uses Vehicle (strategy)
class Driver {
  private vehicle: Vehicle;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }

  setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }
}

const car = new Car();
const bike = new Bike();

const driver = new Driver(car); 
driver.drive();                 

driver.setVehicle(bike);        
driver.drive();                 
