const Shape = require('./Shape');

class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }
  getArea() {
    return (this.radius * this.radius * Math.PI).toFixed(2);
  }
  printEtc() {
    console.log(super.test);
  }
}

module.exports = Circle;
