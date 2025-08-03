abstract class Beverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class GreenTea extends Beverage {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

class Sugar extends Beverage {
  private beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }

  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}

const tea = new Sugar(new Sugar(new GreenTea()));
console.log(tea.getDescription()); 
console.log(tea.getCost());        
