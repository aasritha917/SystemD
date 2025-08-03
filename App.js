var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.prototype.start = function () {
        console.log("Engine started");
    };
    return Engine;
}());
var Car = /** @class */ (function () {
    function Car() {
        this.engine = new Engine();
    }
    Car.prototype.drive = function () {
        this.engine.start();
        console.log("Car is driving");
    };
    return Car;
}());
var myCar = new Car();
myCar.drive();
