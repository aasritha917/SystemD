var PremiumBook = /** @class */ (function () {
    function PremiumBook(title, price) {
        this.title = title;
        this.price = price;
    }
    PremiumBook.prototype.getCategory = function () {
        return "Premium Book";
    };
    return PremiumBook;
}());
var RegularBook = /** @class */ (function () {
    function RegularBook(title, price) {
        this.title = title;
        this.price = price;
    }
    RegularBook.prototype.getCategory = function () {
        return "Regular Book";
    };
    return RegularBook;
}());
var BookFactory = /** @class */ (function () {
    function BookFactory() {
    }
    BookFactory.createBook = function (title, price) {
        if (price > 1000) {
            return new PremiumBook(title, price);
        }
        else {
            return new RegularBook(title, price);
        }
    };
    return BookFactory;
}());
var b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory()); // Premium Book
var b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory()); // Regular Book
