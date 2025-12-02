class User {
  constructor(name, email, address) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.orderHistory = [];
  }

  addOrder(order) {
    this.orderHistory.push(order);
  }

  // 나중에 주문 내역을 가져오는 함수도 만들어야겠다.
  getOrderHistory() {
    return this.orderHistory.map(order => order.getOrderSummary());
    // return this.orderHistory.forEach(order => order.getOrderSummary());
    // forEach 문은 리턴값이 없어서 undefined
  }
}

module.exports = User;
