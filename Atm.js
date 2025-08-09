// Context
var ATM = /** @class */ (function () {
    function ATM() {
        this.balance = 1000;
        this.idleState = new IdleState(this);
        this.cardInsertedState = new CardInsertedState(this);
        this.authenticatedState = new AuthenticatedState(this);
        this.dispensingCashState = new DispensingCashState(this);
        this.currentState = this.idleState;
    }
    ATM.prototype.setState = function (state) {
        this.currentState = state;
    };
    ATM.prototype.insertCard = function () {
        this.currentState.insertCard();
    };
    ATM.prototype.enterPin = function (pin) {
        this.currentState.enterPin(pin);
    };
    ATM.prototype.withdrawCash = function (amount) {
        this.currentState.withdrawCash(amount);
    };
    return ATM;
}());
// Idle State
var IdleState = /** @class */ (function () {
    function IdleState(atm) {
        this.atm = atm;
    }
    IdleState.prototype.insertCard = function () {
        console.log("Card inserted. Please enter your PIN.");
        this.atm.setState(this.atm.cardInsertedState);
    };
    IdleState.prototype.enterPin = function (_) {
        console.log("Insert card first.");
    };
    IdleState.prototype.withdrawCash = function (_) {
        console.log("Insert card first.");
    };
    return IdleState;
}());
// Card Inserted State
var CardInsertedState = /** @class */ (function () {
    function CardInsertedState(atm) {
        this.atm = atm;
    }
    CardInsertedState.prototype.insertCard = function () {
        console.log("Card already inserted.");
    };
    CardInsertedState.prototype.enterPin = function (pin) {
        if (pin === 1234) {
            console.log("PIN correct. You can withdraw cash.");
            this.atm.setState(this.atm.authenticatedState);
        }
        else {
            console.log("Incorrect PIN. Ejecting card.");
            this.atm.setState(this.atm.idleState);
        }
    };
    CardInsertedState.prototype.withdrawCash = function (_) {
        console.log("Enter PIN first.");
    };
    return CardInsertedState;
}());
// Authenticated State
var AuthenticatedState = /** @class */ (function () {
    function AuthenticatedState(atm) {
        this.atm = atm;
    }
    AuthenticatedState.prototype.insertCard = function () {
        console.log("Card already inserted.");
    };
    AuthenticatedState.prototype.enterPin = function (_) {
        console.log("PIN already entered.");
    };
    AuthenticatedState.prototype.withdrawCash = function (amount) {
        if (amount > this.atm.balance) {
            console.log("Insufficient funds.");
        }
        else {
            console.log("Dispensing ".concat(amount, "..."));
            this.atm.balance -= amount;
            this.atm.setState(this.atm.dispensingCashState);
            this.atm.withdrawCash(0); // trigger cash dispensing
        }
    };
    return AuthenticatedState;
}());
// Dispensing Cash State
var DispensingCashState = /** @class */ (function () {
    function DispensingCashState(atm) {
        this.atm = atm;
    }
    DispensingCashState.prototype.insertCard = function () {
        console.log("Please wait, dispensing cash.");
    };
    DispensingCashState.prototype.enterPin = function (_) {
        console.log("Please wait, dispensing cash.");
    };
    DispensingCashState.prototype.withdrawCash = function (_) {
        console.log("Cash dispensed. Returning to idle state.");
        this.atm.setState(this.atm.idleState);
    };
    return DispensingCashState;
}());
// ----- Usage -----
var atm = new ATM();
atm.insertCard();
atm.enterPin(1234);
atm.withdrawCash(200);
atm.insertCard();
atm.enterPin(9999);
