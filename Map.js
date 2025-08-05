var Laptop = /** @class */ (function () {
    function Laptop(name, price) {
        this.name = name;
        this.price = price;
    }
    Laptop.prototype.getDescription = function () {
        return "Laptop: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return Laptop;
}());
var Mobile = /** @class */ (function () {
    function Mobile(name, price) {
        this.name = name;
        this.price = price;
    }
    Mobile.prototype.getDescription = function () {
        return "Mobile: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return Mobile;
}());
var Tablet = /** @class */ (function () {
    function Tablet(name, price) {
        this.name = name;
        this.price = price;
    }
    Tablet.prototype.getDescription = function () {
        return "Tablet: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return Tablet;
}());
var productMap = {
    Laptop: Laptop,
    Mobile: Mobile,
    Tablet: Tablet
};
var ProductFactory = /** @class */ (function () {
    function ProductFactory() {
    }
    ProductFactory.createProduct = function (type, name, price) {
        var ProductClass = productMap[type];
        if (!ProductClass)
            throw new Error("Unknown product type");
        return new ProductClass(name, price);
    };
    return ProductFactory;
}());
var t = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(t.getDescription());
