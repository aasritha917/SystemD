var Warrior = /** @class */ (function () {
    function Warrior(name) {
        this.name = name;
    }
    Warrior.prototype.getStats = function () {
        return "Warrior ".concat(this.name, " - Strength: 90, Defense: 70");
    };
    return Warrior;
}());
var Archer = /** @class */ (function () {
    function Archer(name) {
        this.name = name;
    }
    Archer.prototype.getStats = function () {
        return "Archer ".concat(this.name, " - Agility: 80, Strength: 40");
    };
    return Archer;
}());
var Mage = /** @class */ (function () {
    function Mage(name) {
        this.name = name;
    }
    Mage.prototype.getStats = function () {
        return "Mage ".concat(this.name, " - Intelligence: 90, Mana: 100");
    };
    return Mage;
}());
var CharacterFactory = /** @class */ (function () {
    function CharacterFactory() {
    }
    CharacterFactory.createCharacter = function (type, name) {
        switch (type) {
            case "Warrior":
                return new Warrior(name);
            case "Archer":
                return new Archer(name);
            case "Mage":
                return new Mage(name);
            default:
                throw new Error("Unsupported character type: ".concat(type));
        }
    };
    return CharacterFactory;
}());
var archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());
var mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
var warrior = CharacterFactory.createCharacter("Warrior", "Thorin");
console.log(warrior.getStats());
