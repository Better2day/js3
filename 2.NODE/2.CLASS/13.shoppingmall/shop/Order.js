class Order {
  constructor(user) {
    this.user = user;
    this.products = [];
    this.totalAmount = 0;
  }

  // order1.addProduct(laptop, 1);
  addProduct(product, quantity) {
    // Business Logic - 같은(한 가지) 기능이라도 구현하는 방법은 다양하다.
    // 논리적으로 생각해서, 상품과 개수를 어떻게 다룰 것인가?
    if (product.checkAvailability(quantity)) {
      this.products.push({ product, quantity });
      this.totalAmount += product.price * quantity;
    } else {
      console.log(`상품 재고가 부족합니다. ${product.name}을 주문하실 수 없습니다.`);
    }
  }

  // getOrderSummaryOldJS() {
  //   const items = [];

  //   for (let i = 0; i < this.products.length; i++) {
  //     const { product, quantity } = this.products[i];

  //     items.push({
  //       name: product.name,
  //       quantity: quantity,
  //       price: product.price
  //     })
  //   }

  //   return {
  //     user. 
  //   }
  // }

  getOrderSummary() {
    return {
      // 내가 원하는 것을 key, value로 반환
      user: this.user.name,
      totalAmount: this.totalAmount,
      products: this.products.map(({ product, quantity }) => ({
        name: product.name,
        price: product.price,
        quantity
      }))
    }

    // 아래 map 함수에서 객체를 반환하는데, 일반 콜백 함수처럼 화살표 뒤에 { } 블록을 쓰고 그 안에 객체 리터럴을 넣으면 오류 발생
    // MDN 화살표 함수 주의사항 - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    // "간결한 본문 구문은 (params) => { object: literal }을 사용하여 객체 리터럴을 반환하면 예상대로 작동하지 않습니다.
    // JS는 화살표 뒤에 오는 토큰이 왼쪽 중괄호 {가 아닌 경우에만 화살표 함수에 간결한 본문이 있는 것으로 간주합니다.
    // 중괄호 {} 안의 코드는 일련의 구문으로 파싱되며, 여기서 foo는 객체 리터럴의 키가 아닌 label이 됩니다.
    // ※ 해결책: 이 문제를 해결하려면 객체 리터럴을 괄호로 묶으면 됩니다.
    // const items = [];
    // items.push(this.products.map(({ product, quantity }) => ({
    //   name: product.name,
    //   price: product.price,
    //   quantity
    // })));
    // return items;
  }
}

module.exports = Order;
