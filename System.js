var Elevator = /** @class */ (function () {
    function Elevator(id) {
        this.id = id;
        this.currentFloor = 1;
        this.direction = 'IDLE';
        this.state = 'CLOSE_DOOR';
        this.capacityPeople = 8;
        this.capacityWeight = 680;
        this.passengers = [];
        this.targetFloors = [];
    }
    Object.defineProperty(Elevator.prototype, "totalWeight", {
        get: function () {
            return this.passengers.reduce(function (sum, p) { return sum + p.weight; }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Elevator.prototype.canAddPassenger = function (passenger) {
        return (this.passengers.length < this.capacityPeople &&
            this.totalWeight + passenger.weight <= this.capacityWeight);
    };
    Elevator.prototype.addPassenger = function (passenger) {
        if (this.canAddPassenger(passenger)) {
            this.passengers.push(passenger);
            return true;
        }
        return false;
    };
    Elevator.prototype.removePassengersAtFloor = function (floor) {
        this.passengers = this.passengers.filter(function () { return Math.random() > 0.5; });
    };
    Elevator.prototype.moveOneFloor = function () {
        if (this.direction === 'UP')
            this.currentFloor++;
        else if (this.direction === 'DOWN')
            this.currentFloor--;
    };
    Elevator.prototype.openDoor = function () {
        this.state = 'OPEN_DOOR';
    };
    Elevator.prototype.closeDoor = function () {
        this.state = 'CLOSE_DOOR';
    };
    Elevator.prototype.setTarget = function (floor) {
        if (!this.targetFloors.includes(floor))
            this.targetFloors.push(floor);
    };
    Elevator.prototype.step = function () {
        if (this.targetFloors.length === 0) {
            this.direction = 'IDLE';
            return;
        }
        var target = this.targetFloors[0];
        if (this.currentFloor < target) {
            this.direction = 'UP';
            this.state = 'MOVING';
            this.moveOneFloor();
        }
        else if (this.currentFloor > target) {
            this.direction = 'DOWN';
            this.state = 'MOVING';
            this.moveOneFloor();
        }
        else {
            this.openDoor();
            this.removePassengersAtFloor(target);
            this.targetFloors.shift();
            this.closeDoor();
            if (this.targetFloors.length === 0)
                this.direction = 'IDLE';
        }
    };
    return Elevator;
}());
var ElevatorSystem = /** @class */ (function () {
    function ElevatorSystem(count) {
        this.elevators = Array.from({ length: count }, function (_, i) { return new Elevator(i + 1); });
        this.pendingRequests = [];
    }
    ElevatorSystem.prototype.requestElevator = function (from, to, passenger) {
        var elevator = this.findBestElevator(from);
        if (elevator && elevator.canAddPassenger(passenger)) {
            elevator.addPassenger(passenger);
            elevator.setTarget(from);
            elevator.setTarget(to);
        }
        else {
            this.pendingRequests.push({ from: from, to: to, passenger: passenger });
        }
    };
    ElevatorSystem.prototype.findBestElevator = function (floor) {
        var best = null;
        var minDistance = Infinity;
        for (var _i = 0, _a = this.elevators; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.state === 'MOVING' && e.direction === 'UP' && floor < e.currentFloor)
                continue;
            if (e.state === 'MOVING' && e.direction === 'DOWN' && floor > e.currentFloor)
                continue;
            var distance = Math.abs(e.currentFloor - floor);
            if (distance < minDistance && e.passengers.length < e.capacityPeople) {
                minDistance = distance;
                best = e;
            }
        }
        return best;
    };
    ElevatorSystem.prototype.step = function () {
        for (var _i = 0, _a = this.elevators; _i < _a.length; _i++) {
            var e = _a[_i];
            e.step();
        }
        var remaining = [];
        for (var _b = 0, _c = this.pendingRequests; _b < _c.length; _b++) {
            var r = _c[_b];
            var elevator = this.findBestElevator(r.from);
            if (elevator && elevator.canAddPassenger(r.passenger)) {
                elevator.addPassenger(r.passenger);
                elevator.setTarget(r.from);
                elevator.setTarget(r.to);
            }
            else {
                remaining.push(r);
            }
        }
        this.pendingRequests = remaining;
    };
    ElevatorSystem.prototype.status = function () {
        return this.elevators.map(function (e) { return ({
            id: e.id,
            floor: e.currentFloor,
            direction: e.direction,
            state: e.state,
            occupancy: "".concat(e.passengers.length, "/").concat(e.capacityPeople),
            weight: "".concat(e.totalWeight, "/").concat(e.capacityWeight)
        }); });
    };
    return ElevatorSystem;
}());
var system = new ElevatorSystem(3);
system.requestElevator(3, 7, { weight: 70 });
system.requestElevator(5, 1, { weight: 80 });
for (var i = 0; i < 10; i++) {
    system.step();
    console.log(system.status());
}
