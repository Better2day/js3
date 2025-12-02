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
