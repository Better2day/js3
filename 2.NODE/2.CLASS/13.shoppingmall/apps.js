const User = require('./shop/User');
const { Electronics, Clothing } = require('./shop/Product');
const Order = require('./shop/Order');

// 사용자 생성
const user1 = new User('홍길동', 'hong@gildong.com', '서울시 강남구');
const laptop = new Electronics('갤럭시북', 1_000_000, 5, '2년 보증');
const mouse = new Electronics('마우스', 100_000, 100, '1년 보증');
const tshirtM = new Clothing('무지T셔츠', 50_000, 25, 'M');
const tshirtL = new Clothing('무지T셔츠', 50_000, 10, 'L');

// 주문 생성
const order1 = new Order(user1);
order1.addProduct(laptop, 1);
order1.addProduct(mouse, 2);
order1.addProduct(tshirtM, 1);

// 사용자에게 할당
user1.addOrder(order1);

console.log('주문 내역: ', order1.getOrderSummary());
console.log('사용자의 구매 이력: ', user1.getOrderHistory());
