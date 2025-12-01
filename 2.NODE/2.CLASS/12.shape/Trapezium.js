const Shape = require('./Shape');

class Trapezium extends Shape {
  constructor(upper, lower, height) {
    super('Trapezium');
    this.upper = upper;
    this.lowerS = lower;
    this.height = height;
  }
  getArea() {
    return 0.5 * (this.upper + this.lower) * this.height;
  }
}

module.exports = Trapezium;
