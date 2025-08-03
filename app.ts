var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        console.log("Car is starting");
    };
    return Car;
}());
var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting");
    };
    return Bike;
}());
var Driver = /** @class */ (function () {
    function Driver(vehicle) {
        this.vehicle = vehicle;
    }
    Driver.prototype.drive = function () {
        this.vehicle.start();
        console.log("Driving...");
    };
    return Driver;
}());
var carDriver = new Driver(new Car());
carDriver.drive();
var bikeDriver = new Driver(new Bike());
bikeDriver.drive();
