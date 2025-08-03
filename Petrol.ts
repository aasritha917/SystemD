interface IEngine {
  start(): void;
}

class PetrolEngine implements IEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}

class DieselEngine implements IEngine {
  start(): void {
    console.log("Diesel engine started");
  }
}

class Car {
  private engine: IEngine;

  constructor(engine: IEngine) {
    this.engine = engine;
  }

  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}

const petrolCar = new Car(new PetrolEngine());
petrolCar.drive();

const dieselCar = new Car(new DieselEngine());
dieselCar.drive();
