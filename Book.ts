interface Book {
  getCategory(): string;
}

class PremiumBook implements Book {
  constructor(private title: string, private price: number) {}

  getCategory(): string {
    return "Premium Book";
  }
}

class RegularBook implements Book {
  constructor(private title: string, private price: number) {}

  getCategory(): string {
    return "Regular Book";
  }
}

class BookFactory {
  static createBook(title: string, price: number): Book {
    if (price > 1000) {
      return new PremiumBook(title, price);
    } else {
      return new RegularBook(title, price);
    }
  }
}

const b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory()); // Premium Book

const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory()); // Regular Book
