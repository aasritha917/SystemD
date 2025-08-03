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

const tea = new GreenTea();
console.log(tea.getDescription()); 
console.log(tea.getCost());        
