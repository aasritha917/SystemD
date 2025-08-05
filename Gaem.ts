interface Character {
  getStats(): string;
}

class Warrior implements Character {
  constructor(private name: string) {}

  getStats(): string {
    return `Warrior ${this.name} - Strength: 90, Defense: 70`;
  }
}

class Archer implements Character {
  constructor(private name: string) {}

  getStats(): string {
    return `Archer ${this.name} - Agility: 80, Strength: 40`;
  }
}

class Mage implements Character {
  constructor(private name: string) {}

  getStats(): string {
    return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
  }
}

class CharacterFactory {
  static createCharacter(type: "Warrior" | "Archer" | "Mage", name: string): Character {
    switch (type) {
      case "Warrior":
        return new Warrior(name);
      case "Archer":
        return new Archer(name);
      case "Mage":
        return new Mage(name);
      default:
        throw new Error(`Unsupported character type: ${type}`);
    }
  }
}

const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());

const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());

const warrior = CharacterFactory.createCharacter("Warrior", "Thorin");
console.log(warrior.getStats());
