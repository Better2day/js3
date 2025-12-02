class User {
  constructor(name, email, address) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.orderHistory = [];
  }

  addOrder(order) {
    this.orderHistory.push(order);
    // console.log('User.addOrder 실행 완료', this.orderHistory);
  }

  // 나중에 주문 내역을 가져오는 함수도 만들어야겠다.
  getOrderHistory() {
    return this.orderHistory.map(order => order.getOrderSummary());
    // let orders = this.orderHistory.forEach(order => order.getOrderSummary());
    // return orders;

    // let orders = [];
    // return this.orderHistory.forEach(order => order.products);
    // return orders;
    // console.log(this.orderHistory);
    // let orders = this.orderHistory.forEach(order => order.user.orderHistory);
    // return orders;
  }
}

module.exports = User;
