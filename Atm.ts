// State Interface
interface ATMState {
  insertCard(): void;
  enterPin(pin: number): void;
  withdrawCash(amount: number): void;
}

// Context
class ATM {
  idleState: ATMState;
  cardInsertedState: ATMState;
  authenticatedState: ATMState;
  dispensingCashState: ATMState;

  currentState: ATMState;
  balance: number = 1000;

  constructor() {
    this.idleState = new IdleState(this);
    this.cardInsertedState = new CardInsertedState(this);
    this.authenticatedState = new AuthenticatedState(this);
    this.dispensingCashState = new DispensingCashState(this);

    this.currentState = this.idleState;
  }

  setState(state: ATMState) {
    this.currentState = state;
  }

  insertCard() {
    this.currentState.insertCard();
  }

  enterPin(pin: number) {
    this.currentState.enterPin(pin);
  }

  withdrawCash(amount: number) {
    this.currentState.withdrawCash(amount);
  }
}

// Idle State
class IdleState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Card inserted. Please enter your PIN.");
    this.atm.setState(this.atm.cardInsertedState);
  }

  enterPin(_: number): void {
    console.log("Insert card first.");
  }

  withdrawCash(_: number): void {
    console.log("Insert card first.");
  }
}

// Card Inserted State
class CardInsertedState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Card already inserted.");
  }

  enterPin(pin: number): void {
    if (pin === 1234) {
      console.log("PIN correct. You can withdraw cash.");
      this.atm.setState(this.atm.authenticatedState);
    } else {
      console.log("Incorrect PIN. Ejecting card.");
      this.atm.setState(this.atm.idleState);
    }
  }

  withdrawCash(_: number): void {
    console.log("Enter PIN first.");
  }
}

// Authenticated State
class AuthenticatedState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Card already inserted.");
  }

  enterPin(_: number): void {
    console.log("PIN already entered.");
  }

  withdrawCash(amount: number): void {
    if (amount > this.atm.balance) {
      console.log("Insufficient funds.");
    } else {
      console.log(`Dispensing ${amount}...`);
      this.atm.balance -= amount;
      this.atm.setState(this.atm.dispensingCashState);
      this.atm.withdrawCash(0); // trigger cash dispensing
    }
  }
}

// Dispensing Cash State
class DispensingCashState implements ATMState {
  constructor(private atm: ATM) {}

  insertCard(): void {
    console.log("Please wait, dispensing cash.");
  }

  enterPin(_: number): void {
    console.log("Please wait, dispensing cash.");
  }

  withdrawCash(_: number): void {
    console.log("Cash dispensed. Returning to idle state.");
    this.atm.setState(this.atm.idleState);
  }
}

// ----- Usage -----
const atm = new ATM();

atm.insertCard();       
atm.enterPin(1234);     
atm.withdrawCash(200);   

atm.insertCard();      
atm.enterPin(9999);      
