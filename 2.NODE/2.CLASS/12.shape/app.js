const Square = require('./Square');
const Triangle = require('./Triangle');
const Trapezium = require('./Trapezium');
const Circle = require('./Circle');
const Star = require('./Star');

const square = new Square(5);
const triangle = new Triangle(4, 3);
const trapezium = new Trapezium(4, 6, 5);
const circle = new Circle(5);
const star = new Star(5);

console.log('사각형의 넓이: ', square.getArea()); // 25
console.log('삼각형의 넓이: ', triangle.getArea()); // 6
console.log('사다리꼴의 넓이: ', trapezium.getArea()); // 25
console.log('원의 넓이: ', circle.getArea()); // 28.27
console.log('별의 넓이: ', star.getArea());
console.log('별의 넓이: ', star.getStarArea());

// circle.printEtc();


// Square, Triangle 등 각 도형이 Shape를 상속받게 만들고 (5개의 파일), getArea()를 overriding
