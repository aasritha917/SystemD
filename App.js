// Idle State
var IdleState = /** @class */ (function () {
    function IdleState() {
    }
    IdleState.prototype.insertCoin = function (machine) {
        console.log("Coin inserted. Moving to Processing state.");
        machine.setState(machine.processingState);
    };
    IdleState.prototype.selectItem = function () {
        console.log("You must insert a coin first.");
    };
    IdleState.prototype.dispenseItem = function () {
        console.log("You must insert a coin and select an item first.");
    };
    return IdleState;
}());
// Processing State
var ProcessingState = /** @class */ (function () {
    function ProcessingState() {
    }
    ProcessingState.prototype.insertCoin = function () {
        console.log("Coin already inserted.");
    };
    ProcessingState.prototype.selectItem = function (machine) {
        console.log("Item selected. Moving to Dispensing state.");
        machine.setState(machine.dispensingState);
    };
    ProcessingState.prototype.dispenseItem = function () {
        console.log("You must select an item first.");
    };
    return ProcessingState;
}());
// Dispensing State
var DispensingState = /** @class */ (function () {
    function DispensingState() {
    }
    DispensingState.prototype.insertCoin = function () {
        console.log("Please wait. Currently dispensing item.");
    };
    DispensingState.prototype.selectItem = function () {
        console.log("Already dispensing. Please wait.");
    };
    DispensingState.prototype.dispenseItem = function (machine) {
        console.log("Dispensing item... Returning to Idle state.");
        machine.setState(machine.idleState);
    };
    return DispensingState;
}());
// Vending Machine
var VendingMachine = /** @class */ (function () {
    function VendingMachine() {
        this.idleState = new IdleState();
        this.processingState = new ProcessingState();
        this.dispensingState = new DispensingState();
        this.currentState = this.idleState; // Start in Idle
    }
    VendingMachine.prototype.setState = function (state) {
        this.currentState = state;
    };
    VendingMachine.prototype.insertCoin = function () {
        this.currentState.insertCoin(this);
    };
    VendingMachine.prototype.selectItem = function () {
        this.currentState.selectItem(this);
    };
    VendingMachine.prototype.dispenseItem = function () {
        this.currentState.dispenseItem(this);
    };
    return VendingMachine;
}());
// Example Usage
var machine = new VendingMachine();
machine.insertCoin();
machine.selectItem();
machine.dispenseItem();
