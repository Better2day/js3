class MathOps {
  static PI = 3.141592;

  static add(x, y) {
    return x + y;
  }

  static subract(x, y) {
    return x - y;
  }
}

// const myMath = new MathOps();
// console.log(myMath.PI);

const myMath = MathOps.PI;
console.log(myMath);
console.log(MathOps.add(2, 5));
