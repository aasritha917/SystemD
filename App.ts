interface Vehicle {
  getDetails(): string;
}

class Bike implements Vehicle {
  constructor(private brand: string) {}

  getDetails(): string {
    return `Bike: ${this.brand}`;
  }
}

class Car implements Vehicle {
  constructor(private brand: string) {}

  getDetails(): string {
    return `Car: ${this.brand}`;
  }
}

class VehicleFactory {
  static createVehicle(type: "Bike" | "Car", brand: string): Vehicle {
    switch (type) {
      case "Bike":
        return new Bike(brand);
      case "Car":
        return new Car(brand);
      default:
        throw new Error("Invalid vehicle type");
    }
  }
}

const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails()); // Bike: Yamaha

const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); // Car: Toyota
