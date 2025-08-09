// Red State
var RedState = /** @class */ (function () {
    function RedState() {
    }
    RedState.prototype.change = function (light) {
        console.log("Changing from RED to GREEN...");
        light.setState(new GreenState());
    };
    RedState.prototype.report = function () {
        console.log("🔴 Red Light - Vehicles must stop.");
    };
    return RedState;
}());
// Green State
var GreenState = /** @class */ (function () {
    function GreenState() {
    }
    GreenState.prototype.change = function (light) {
        console.log("Changing from GREEN to YELLOW...");
        light.setState(new YellowState());
    };
    GreenState.prototype.report = function () {
        console.log("🟢 Green Light - Vehicles can move.");
    };
    return GreenState;
}());
// Yellow State
var YellowState = /** @class */ (function () {
    function YellowState() {
    }
    YellowState.prototype.change = function (light) {
        console.log("Changing from YELLOW to RED...");
        light.setState(new RedState());
    };
    YellowState.prototype.report = function () {
        console.log("🟡 Yellow Light - Vehicles should slow down.");
    };
    return YellowState;
}());
// Traffic Light Context
var TrafficLight = /** @class */ (function () {
    function TrafficLight() {
        this.state = new RedState(); // Initial state
    }
    TrafficLight.prototype.setState = function (state) {
        this.state = state;
    };
    TrafficLight.prototype.change = function () {
        this.state.change(this);
    };
    TrafficLight.prototype.report = function () {
        this.state.report();
    };
    return TrafficLight;
}());
// Example Usage
var trafficLight = new TrafficLight();
trafficLight.report();
trafficLight.change();
trafficLight.report();
trafficLight.change();
trafficLight.report();
trafficLight.change();
trafficLight.report();
