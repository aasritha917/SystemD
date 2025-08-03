var PetrolEngine = /** @class */ (function () {
    function PetrolEngine() {
    }
    PetrolEngine.prototype.start = function () {
        console.log("Petrol engine started");
    };
    return PetrolEngine;
}());
var DieselEngine = /** @class */ (function () {
    function DieselEngine() {
    }
    DieselEngine.prototype.start = function () {
        console.log("Diesel engine started");
    };
    return DieselEngine;
}());
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.drive = function () {
        this.engine.start();
        console.log("Driving car");
    };
    return Car;
}());
var petrolCar = new Car(new PetrolEngine());
petrolCar.drive();
var dieselCar = new Car(new DieselEngine());
dieselCar.drive();
