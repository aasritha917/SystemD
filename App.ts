// State interface
interface State {
  insertCoin(machine: VendingMachine): void;
  selectItem(machine: VendingMachine): void;
  dispenseItem(machine: VendingMachine): void;
}

// Idle State
class IdleState implements State {
  insertCoin(machine: VendingMachine): void {
    console.log("Coin inserted. Moving to Processing state.");
    machine.setState(machine.processingState);
  }
  selectItem(): void {
    console.log("You must insert a coin first.");
  }
  dispenseItem(): void {
    console.log("You must insert a coin and select an item first.");
  }
}

// Processing State
class ProcessingState implements State {
  insertCoin(): void {
    console.log("Coin already inserted.");
  }
  selectItem(machine: VendingMachine): void {
    console.log("Item selected. Moving to Dispensing state.");
    machine.setState(machine.dispensingState);
  }
  dispenseItem(): void {
    console.log("You must select an item first.");
  }
}

// Dispensing State
class DispensingState implements State {
  insertCoin(): void {
    console.log("Please wait. Currently dispensing item.");
  }
  selectItem(): void {
    console.log("Already dispensing. Please wait.");
  }
  dispenseItem(machine: VendingMachine): void {
    console.log("Dispensing item... Returning to Idle state.");
    machine.setState(machine.idleState);
  }
}

// Vending Machine
class VendingMachine {
  public idleState: State;
  public processingState: State;
  public dispensingState: State;

  private currentState: State;

  constructor() {
    this.idleState = new IdleState();
    this.processingState = new ProcessingState();
    this.dispensingState = new DispensingState();

    this.currentState = this.idleState; // Start in Idle
  }

  setState(state: State): void {
    this.currentState = state;
  }

  insertCoin(): void {
    this.currentState.insertCoin(this);
  }

  selectItem(): void {
    this.currentState.selectItem(this);
  }

  dispenseItem(): void {
    this.currentState.dispenseItem(this);
  }
}

// Example Usage
const machine = new VendingMachine();

machine.insertCoin();  
machine.selectItem();   
machine.dispenseItem(); 
