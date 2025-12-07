const { getRandomElement, getRandomInRange } = require('../util/getRandom');

// 굳이 카테고리를 만들어서 무작위 품목 유형을 뽑고, 그것을 가지고 무작위 품목을 뽑을 필요가 있을까?
// itemCategory = ['Coffee', 'Latte', 'Tea', 'Ade', 'Juice', 'Smoothie', 'Cake', 'Bread', 'Snack', 'Dessert'];

// 그냥 아래와 같이 품목 객체를 담은 배열을 만들고, 여기에서 무작위 품목을 한 개 뽑는 게 수월할 듯
itemPool = [
  // 품목 유형(카테고리): 품목명
  { Coffee: 'Americano' },
  { Coffee: 'Caffe Latte' },
  { Coffee: 'Cappuccino' },
  { Coffee: 'Vanilla Latte' },
  { Coffee: 'Cafe Mocha' },
  { Coffee: 'Caramel Macchiato' },
  { Coffee: 'Cold Brew' },
  { Coffee: 'Dolce Latte' },
  { Coffee: 'Einspanner' },
  { Coffee: 'Hazelnut Latte' },
  { Latte: 'Matcha Latte' }, // 말차 라떼
  { Latte: 'Sweet Potato Latte' }, // 고구마
  { Latte: 'Chai Latte' },
  { Latte: 'Black Sesame Latte' }, // 검은깨
  { Latte: 'Strawberry Latte' },
  { Tea: 'Earl Grey Tea' },
  { Tea: 'Chamomile Tea' },
  { Tea: 'Peppermint Tea' },
  { Tea: 'Lemon Tea' },
  { Tea: 'Grapefruit Tea' },
  { Ade: 'Lemon Ade' },
  { Ade: 'Grapefruit Ade' },
  { Ade: 'Green Grape Ade' },
  { Ade: 'Blue Lemon Ade' },
  { Ade: 'Peach Ade' },
  { Juice: 'Watermelon Juice' },
  { Juice: 'Orange Juice' },
  { Juice: 'Apple Juice' },
  { Juice: 'Grapefruit Juice' },
  { Juice: 'Strawberry Juice' },
  { Smoothie: 'Strawberry Smoothie' },
  { Smoothie: 'Blueberry Smoothie' },
  { Smoothie: 'Mango Smoothie' },
  { Smoothie: 'Yogurt Smoothie' },
  { Smoothie: 'Green Smoothie' },
  { Cake: 'Strawberry Cake' },
  { Cake: 'Chocolate Cake' },
  { Cake: 'Red Velvet Cake' },
  { Cake: 'Tiramisu Cake' },
  { Cake: 'Carrot Cake' },
  { Bread: 'Croissant' },
  { Bread: 'Butter Bread' },
  { Bread: 'Garlic Bread' },
  { Bread: 'Bagel Cream Cheese' },
  { Bread: 'Pain au Chocolat' }, // 팡 오 쇼콜라
  { Dessert: 'Madeleine' }, // 마들렌
  { Dessert: 'Financier' }, // 휘낭시에
  { Dessert: 'Chocolate Chip Cookie' },
  { Dessert: 'Brownie' },
  { Dessert: 'Macaron' }
];

// 품목 유형별 가격 범위 (무작위 가격을 정할 때, 품목 유형별로 말이 안 되는 가격을 예방하기 위함)
priceRangePerType = [
  { Coffee: [2500, 6500] },
  { Latte: [3500, 7500] },
  { Tea: [3000, 7000] },
  { Ade: [4000, 8500] },
  { Juice: [3000, 8000] },
  { Smoothie: [4500, 9000] },
  { Cake: [5000, 35_000] },
  { Bread: [2000, 6000] },
  { Snack: [1500, 7000] },
  { Dessert: [2000, 9000] }
];

// 무작위 품목 (품목명, 품목 유형)
function getRandomItem() {
  const itemObj = getRandomElement(itemPool);
  return { name: Object.values(itemObj)[0], type: Object.keys(itemObj)[0] };
}

// 품목 유형별 가격 범위 안에서 무작위 단가 (100원 단위)
function getRandomPricePerType(type) {
  const priceRange = (priceRangePerType.find(el => Object.keys(el)[0] == type))[type];
  return Math.floor(getRandomInRange(priceRange[0], priceRange[1]) / 100) * 100; // 100원 이하 절사
}

module.exports = { getRandomItem, getRandomPricePerType };
