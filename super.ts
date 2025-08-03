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

class Coffee extends Beverage {
  getDescription(): string {
    return "Coffee";
  }

  getCost(): number {
    return 50;
  }
}

class Sugar extends Beverage {
  constructor(private beverage: Beverage) {
    super();
  }

  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }

  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}

class Honey extends Beverage {
  constructor(private beverage: Beverage) {
    super();
  }

  getDescription(): string {
    return this.beverage.getDescription() + " + Honey";
  }

  getCost(): number {
    return this.beverage.getCost() + 20;
  }
}

class WhippedCream extends Beverage {
  constructor(private beverage: Beverage) {
    super();
  }

  getDescription(): string {
    return this.beverage.getDescription() + " + WhippedCream";
  }

  getCost(): number {
    return this.beverage.getCost() + 15;
  }
}

const myDrink = new WhippedCream(new Honey(new Sugar(new Coffee())));

console.log(myDrink.getDescription());
console.log(myDrink.getCost());       
