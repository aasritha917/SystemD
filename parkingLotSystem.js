var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var VehicleType;
(function (VehicleType) {
    VehicleType["BIKE"] = "BIKE";
    VehicleType["CAR"] = "CAR";
    VehicleType["TRUCK"] = "TRUCK";
    VehicleType["EV_CAR"] = "EV_CAR";
})(VehicleType || (VehicleType = {}));
var Vehicle = /** @class */ (function () {
    function Vehicle(number, type) {
        this.number = number;
        this.type = type;
    }
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(number) {
        return _super.call(this, number, VehicleType.CAR) || this;
    }
    return Car;
}(Vehicle));
var EVCar = /** @class */ (function (_super) {
    __extends(EVCar, _super);
    function EVCar(number) {
        return _super.call(this, number, VehicleType.EV_CAR) || this;
    }
    return EVCar;
}(Vehicle));
var SlotType;
(function (SlotType) {
    SlotType["GENERAL"] = "GENERAL";
    SlotType["EV_RESERVED"] = "EV_RESERVED";
})(SlotType || (SlotType = {}));
var ParkingSlot = /** @class */ (function () {
    function ParkingSlot(id, slotType, floor) {
        this.id = id;
        this.slotType = slotType;
        this.floor = floor;
        this.vehicle = null;
    }
    ParkingSlot.prototype.isAvailable = function () {
        return this.vehicle === null;
    };
    ParkingSlot.prototype.park = function (vehicle) {
        this.vehicle = vehicle;
    };
    ParkingSlot.prototype.unpark = function () {
        var temp = this.vehicle;
        this.vehicle = null;
        return temp;
    };
    return ParkingSlot;
}());
var Ticket = /** @class */ (function () {
    function Ticket(ticketId, vehicle, slot, entryTime) {
        this.ticketId = ticketId;
        this.vehicle = vehicle;
        this.slot = slot;
        this.entryTime = entryTime;
    }
    return Ticket;
}());
var Receipt = /** @class */ (function () {
    function Receipt(ticket, exitTime, totalFee) {
        this.ticket = ticket;
        this.exitTime = exitTime;
        this.totalFee = totalFee;
    }
    Receipt.prototype.print = function () {
        console.log("Vehicle: ".concat(this.ticket.vehicle.number));
        console.log("Type: ".concat(this.ticket.vehicle.type));
        console.log("Slot: ".concat(this.ticket.slot.id));
        console.log("Entry: ".concat(this.ticket.entryTime));
        console.log("Exit: ".concat(this.exitTime));
        console.log("Total Fee: \u20B9".concat(this.totalFee));
    };
    return Receipt;
}());
var NearestAvailableStrategy = /** @class */ (function () {
    function NearestAvailableStrategy() {
    }
    NearestAvailableStrategy.prototype.findSlot = function (slots, vehicleType) {
        if (vehicleType === VehicleType.EV_CAR) {
            var reserved = slots.find(function (s) { return s.slotType === SlotType.EV_RESERVED && s.isAvailable(); });
            if (reserved)
                return reserved;
        }
        return slots.find(function (s) { return s.slotType === SlotType.GENERAL && s.isAvailable(); }) || null;
    };
    return NearestAvailableStrategy;
}());
var ParkingLot = /** @class */ (function () {
    function ParkingLot() {
        this.slots = [];
        this.tickets = new Map();
        this.strategy = new NearestAvailableStrategy();
        this.floorCount = 2;
        this.slotsPerFloor = 5;
        this.initialize();
    }
    ParkingLot.prototype.initialize = function () {
        for (var floor = 1; floor <= this.floorCount; floor++) {
            for (var i = 0; i < this.slotsPerFloor; i++) {
                var id = "F".concat(floor, "S").concat(i + 1);
                var slotType = i === 0 ? SlotType.EV_RESERVED : SlotType.GENERAL;
                this.slots.push(new ParkingSlot(id, slotType, floor));
            }
        }
    };
    ParkingLot.prototype.parkVehicle = function (vehicle) {
        var slot = this.strategy.findSlot(this.slots, vehicle.type);
        if (!slot)
            throw new Error("No available slot");
        slot.park(vehicle);
        var ticket = new Ticket("T-".concat(Date.now()), vehicle, slot, new Date());
        this.tickets.set(ticket.ticketId, ticket);
        console.log("Parked at ".concat(slot.id, ", Ticket: ").concat(ticket.ticketId));
        return ticket;
    };
    ParkingLot.prototype.unparkVehicle = function (ticketId) {
        var ticket = this.tickets.get(ticketId);
        if (!ticket)
            throw new Error("Invalid ticket");
        var exitTime = new Date();
        var durationMs = exitTime.getTime() - ticket.entryTime.getTime();
        var hours = Math.ceil(durationMs / (1000 * 60 * 60));
        var rate = RateCard[ticket.vehicle.type];
        var fee = hours * rate;
        ticket.slot.unpark();
        this.tickets.delete(ticketId);
        var receipt = new Receipt(ticket, exitTime, fee);
        receipt.print();
        return receipt;
    };
    return ParkingLot;
}());
var RateCard = (_a = {},
    _a[VehicleType.CAR] = 20,
    _a[VehicleType.EV_CAR] = 25,
    _a[VehicleType.BIKE] = 10,
    _a[VehicleType.TRUCK] = 30,
    _a);
var lot = new ParkingLot();
var v1 = new EVCar("EV123");
var ticket1 = lot.parkVehicle(v1);
setTimeout(function () {
    lot.unparkVehicle(ticket1.ticketId);
}, 2000);
